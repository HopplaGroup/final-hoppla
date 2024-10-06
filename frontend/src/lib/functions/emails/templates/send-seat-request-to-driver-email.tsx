import { sendEmail } from "../send-email";
import { Ride, User } from "@prisma/client";
import { Html, Head } from "@react-email/components";

export async function sendSeatRequestToDriverEmail({
    to,
    passenger,
    ride,
}: {
    to: User[];
    passenger: User;
    ride: Ride;
}) {
    await sendEmail({
        to,
        subject: "Seat request",
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
