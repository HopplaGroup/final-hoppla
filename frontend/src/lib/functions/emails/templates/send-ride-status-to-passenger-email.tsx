import { sendEmail } from "../send-email";
import { User } from "@prisma/client";
import { Html, Head } from "@react-email/components";

export async function sendRideStatusToPassengerEmail({
    to,
    status,
}: {
    to: User[];
    status: "canceled" | "rejected" | "accepted";
    // here cancelled means the ride is cancelled by the driver or even by adrim in future maybe as well even it was accepted
}) {
    await sendEmail({
        to,
        subject: "Your ride status",
        senderName: "Hoppla",
        htmlRender: ({ user }: { user: User }) => {
            return (
                // EMAIL_TODO: Add the email template here
                <Html>
                    <Head></Head>
                </Html>
            );
        },
    });
}
