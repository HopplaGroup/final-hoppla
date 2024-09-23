import db from "@/lib/utils/db";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { PaymentDetailsResponse } from "@/lib/bog/types";
import refundPayment from "@/lib/bog/refund-payment";

const PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----...-----END PUBLIC KEY-----`;

type CallbackResponse = {
    event: "order_payment";
    zoned_request_time: string;
    body: PaymentDetailsResponse;
};

export async function POST(req: NextRequest) {
    try {
        const signature = req.headers.get("Callback-Signature");
        if (!signature) {
            return new NextResponse("Missing signature", { status: 400 });
        }

        const rawBody = await req.text();

        const verifier = crypto.createVerify("SHA256");
        verifier.update(rawBody);
        verifier.end();

        const isValid = verifier.verify(PUBLIC_KEY, signature, "base64");
        if (!isValid) {
            return new NextResponse("Invalid signature", { status: 400 });
        }

        const body: CallbackResponse = JSON.parse(rawBody);

        const {
            body: {
                external_order_id,
                order_id,
                order_status: { key: orderStatusKey },
                payment_detail: { code },
            },
        } = body;

        console.log(
            `Payment callback for order ${order_id}, status: ${orderStatusKey}, code: ${code}`
        );

        if (orderStatusKey === "completed" && code === "100") {
            const [userId, rideId] = external_order_id.split("_");

            // Check if the user is already added to the ride
            const existingPassenger = await db.ridePassenger.findFirst({
                where: { passengerId: userId, rideId: rideId },
            });

            if (existingPassenger) {
                // User already added, do nothing and return success
                return NextResponse.json(
                    { message: "Passenger already added to the ride." },
                    { status: 200 }
                );
            }

            // Attempt to add the passenger
            try {
                await db.ridePassenger.create({
                    data: {
                        passengerId: userId,
                        rideId: rideId,
                    },
                });

                return NextResponse.json(
                    { message: "Passenger successfully added to the ride." },
                    { status: 200 }
                );
            } catch (error) {
                console.error("Error adding passenger:", error);

                // Refund the payment only if adding passenger failed
                await refundPayment(order_id);

                return NextResponse.json(
                    { error: "Error adding passenger. Payment refunded." },
                    { status: 500 }
                );
            }
        } else {
            console.log(`Payment failed or incomplete for order ${order_id}`);
            return NextResponse.json(
                { message: "Payment not completed." },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error("Error processing payment callback:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
