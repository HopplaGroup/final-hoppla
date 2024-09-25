import db from "@/lib/utils/db";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { PaymentDetailsResponse } from "@/lib/bog/types";
import refundPayment from "@/lib/bog/refund-payment";

const PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu4RUyAw3+CdkS3ZNILQh
zHI9Hemo+vKB9U2BSabppkKjzjjkf+0Sm76hSMiu/HFtYhqWOESryoCDJoqffY0Q
1VNt25aTxbj068QNUtnxQ7KQVLA+pG0smf+EBWlS1vBEAFbIas9d8c9b9sSEkTrr
TYQ90WIM8bGB6S/KLVoT1a7SnzabjoLc5Qf/SLDG5fu8dH8zckyeYKdRKSBJKvhx
tcBuHV4f7qsynQT+f2UYbESX/TLHwT5qFWZDHZ0YUOUIvb8n7JujVSGZO9/+ll/g
4ZIWhC1MlJgPObDwRkRd8NFOopgxMcMsDIZIoLbWKhHVq67hdbwpAq9K9WMmEhPn
PwIDAQAB
-----END PUBLIC KEY-----`;

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

            const existingPassenger = await db.ridePassenger.findFirst({
                where: { passengerId: userId, rideId: rideId },
            });

            if (existingPassenger) {
                return NextResponse.json(
                    { message: "Passenger already added to the ride." },
                    { status: 200 }
                );
            }

            try {
                await db.ridePassenger.create({
                    data: {
                        passengerId: userId,
                        rideId: rideId,
                        bogOrderId: order_id,
                    },
                });

                return NextResponse.json(
                    { message: "Passenger successfully added to the ride." },
                    { status: 200 }
                );
            } catch (error) {
                console.error("Error adding passenger:", error);

                if (
                    error instanceof Error &&
                    error.message ===
                        "This ride is full and cannot accept more passengers."
                ) {
                    await refundPayment(order_id);
                    return NextResponse.json(
                        { error: "Error adding passenger. Payment refunded." },
                        { status: 200 }
                    );
                }

                return NextResponse.json(
                    { error: "Error adding passenger. Payment refunded." },
                    { status: 500 }
                );
            }
        } else {
            console.log(`Payment failed or incomplete for order ${order_id}`);
            return NextResponse.json(
                { message: "Payment not completed." },
                { status: 200 }
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
