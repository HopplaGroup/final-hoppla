import { sendEmail } from "../send-email";
import { User } from "@prisma/client";
import { Html, Head } from "@react-email/components";
import HopplaMailTemplate from "./main";

export async function sendRideCancellationToDriverEmail({
    to,
}: {
    to: string[];
}) {
    await sendEmail({
        to,
        subject: "Your ride is cancelled",
        senderName: "Hoppla",
        htmlRender: ({ user }: { user: User }) => {
            return (
                <HopplaMailTemplate
                    previewMessage={"თქვენი მგზავრობა გაუქმდა"}
                    mainMessage={
                        "სამწუხაროდ, თქვენი მგზავრობა გაუქმებულია, ჩვენ მიერ, სავარაუდოდ, პლატფორმის წესების დარღვევასთან დაკავშირებით"
                    }
                    secondaryMessage="Hoppla ❤ ბედნიერ მგზავრობას გისურვებთ 😎. კითხვების შემთხვევაში, გთხოვთ, დაგვიკავშირდით"
                />
            );
        },
    });
}
