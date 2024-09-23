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
    event: "order_payment"; // Fixed event type
    zoned_request_time: string; // ISO string format "YYYY-MM-DDTHH:MM:SS.ssssssZ"
    body: PaymentDetailsResponse;
};

export async function POST(req: NextRequest) {
    try {
        const signature = req.headers.get("Callback-Signature");
        if (!signature) {
            return new NextResponse("Missing signature", { status: 400 });
        }

        const rawBody = await req.text();

        // Create a verifier
        const verifier = crypto.createVerify("SHA256");
        verifier.update(rawBody);
        verifier.end();

        // Verify the signature
        const isValid = verifier.verify(PUBLIC_KEY, signature, "base64");
        if (!isValid) {
            return new NextResponse("Invalid signature", { status: 400 });
        }

        // Now it's safe to parse the body
        const body: CallbackResponse = JSON.parse(rawBody);

        const {
            body: {
                external_order_id,
                order_id,
                order_status: { key: orderStatusKey },
                client: { id: clientId },
                buyer,
                payment_detail: { code, code_description },
                purchase_units: { currency_code, items },
            },
        } = body;

        // Log received payment data (you can also store this in the database for auditing)
        console.log(
            `Payment callback for order ${order_id}, status: ${orderStatusKey}, code: ${code}, description: ${code_description}`
        );

        // Only process if payment is successful
        if (orderStatusKey === "completed" && code === "100") {
            // Find the ride by `order_id` or other identifier in your DB
            // const ride = await db.ride.findUnique({
            //     where: { orderId: order_id }, // Assuming you store order_id in the ride
            // });

            // if (!ride) {
            //     return NextResponse.json(
            //         { error: "Ride not found for this payment." },
            //         { status: 404 }
            //     );
            // }

            // If the ride exists, add the user as a passenger (you might need to retrieve user details from `buyer`)
            // await prisma.ride.update({
            //     where: { id: ride.id },
            //     data: {
            //         passengers: {
            //             connect: { id: clientId }, // Assuming `clientId` refers to the user/passenger
            //         },
            //     },
            // });
            try {
                const [userId, rideId] = external_order_id.split(":");
                await db.ridePassenger.create({
                    data: {
                        passengerId: userId,
                        rideId: rideId,
                    },
                });
            } catch (error) {
                console.error(
                    "Error processing payment callback:",
                    external_order_id,
                    error
                );
                await refundPayment(order_id); // TODO: maybe if not refund then just add balance or who knows
                return NextResponse.json(
                    { error: "Internal Server Error" },
                    { status: 500 }
                );
            }

            return NextResponse.json(
                { message: "Passenger successfully added to the ride." },
                { status: 200 }
            );
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
