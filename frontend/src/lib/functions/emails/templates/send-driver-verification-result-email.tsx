"use server"

import { sendEmail } from "../send-email";
import { User } from "@prisma/client";
import { Html, Head } from "@react-email/components";
import HopplaMailTemplate from "./main";

export async function sendDriverVerificationResultEmail({
    to,
    isAccepted,
}: {
    to: string[];
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
                <HopplaMailTemplate
                    previewMessage={
                        isAccepted
                            ? "მძღოლის მოთხოვნის დასტური"
                            : "მძღოლის მოთხოვნის უარყოფა"
                    }
                    mainMessage={`გადავხედეთ თქვენ მიერ ატვირთულ მასალას, შესაბამისად, ${
                        isAccepted
                            ? "დაგიდასტურდათ მძღოლობის მოთხოვნა. ახლა თქვენი გამოქვეყნებული მგზავრობები ყველასათვის ხილული იქნება ❤"
                            : "სამწუხაროდ, ვერ დაგიდასტურებთ მძღოლის მოთხოვნას, თავიდან ცადეთ"
                    }`}
                    secondaryMessage="Hoppla ❤ ბედნიერ მგზავრობას გისურვებთ 😎. კითხვების შემთხვევაში, გთხოვთ, დაგვიკავშირდით"
                />
            );
        },
    });
}
