import { sendEmail } from "../send-email";
import { User } from "@prisma/client";
import { Html, Head } from "@react-email/components";

export async function sendDriverVerificationResultEmail({
    to,
    isAccepted,
}: {
    to: User[];
    isAccepted: boolean;
}) {
    await sendEmail({
        to,
        subject: isAccepted
            ? "Your driver verification is accepted"
            : "Your driver verification is rejected",
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
