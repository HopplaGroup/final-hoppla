import { sendEmail } from "../send-email";
import { User } from "@prisma/client";
import { Html, Head } from "@react-email/components";

export async function sendRideCancellationToDriverEmail({
    to,
}: {
    to: User[];
}) {
    await sendEmail({
        to,
        subject: "Your ride is cancelled",
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
