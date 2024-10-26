import { sendEmail } from "../send-email";
import { User } from "@prisma/client";
import { Html, Head } from "@react-email/components";
import HopplaMailTemplate from "./main";

export async function sendBanNotificationToUserEmail({ to }: { to: string[] }) {
    // console.log("to", to);
    await sendEmail({
        to,
        subject: "Your account has been banned",
        senderName: "Hoppla",
        htmlRender: ({ user }: { user: User }) => {
            return (
                <HopplaMailTemplate
                    previewMessage="თქვენი ანგარიში დაიხურა"
                    mainMessage="გადავხედეთ თქვენს აქტივობას და დავხურეთ თქვენი ანგარიში"
                    secondaryMessage="Hoppla ❤ ბედნიერ მგზავრობას გისურვებთ 😎. კითხვების შემთხვევაში, გთხოვთ, დაგვიკავშირდით"
                />
            );
        },
    });
}
