import { sendEmail } from "../send-email";
import { User } from "@prisma/client";
import { Html, Head } from "@react-email/components";

export async function sendCarVerificationResultEmail({
    to,
    isAccepted,
}: {
    to: User[];
    isAccepted: boolean;
}) {
    await sendEmail({
        to,
        subject: isAccepted ? "Your car is accepted" : "Your car is rejected",
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
