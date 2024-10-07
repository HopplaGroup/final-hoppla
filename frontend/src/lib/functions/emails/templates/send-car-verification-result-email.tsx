import { sendEmail } from "../send-email";
import { User } from "@prisma/client";
import { Html, Head } from "@react-email/components";
import HopplaMailTemplate from "./main";

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
        <HopplaMailTemplate
          previewMessage={
            isAccepted
              ? "მანქანის დამატების დასტური"
              : "მანქანის დამატების უარყოფა"
          }
          mainMessage={`გადავხედეთ თქვენ მიერ ატვირთულ მასალას, შესაბამისად, ${
            isAccepted ? "დაგიდასტურდათ მანქანა" : "ვერ დაგიდასტურდათ მანქანა"
          }`}
          secondaryMessage="Hoppla ❤ ბედნიერ მგზავრობას გისურვებთ 😎. კითხვების შემთხვევაში, გთხოვთ, დაგვიკავშირდით"
        />
      );
    },
  });
}
