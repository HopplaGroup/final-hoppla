import { sendEmail } from "../send-email";
import { Ride, User } from "@prisma/client";
import { Html, Head } from "@react-email/components";
import HopplaMailTemplate from "./main";

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
        <HopplaMailTemplate
          previewMessage="ადგილის მოთხოვნა"
          mainMessage="მგზავრს სურს გამოგყვეთ, გთხოვთ შეხვიდეთ პლატფორმაზე და გადახედოთ მის მოთხოვნას. დაუდასტურეთ ან უარყავით იგი."
          secondaryMessage="Hoppla ❤ ბედნიერ მგზავრობას გისურვებთ 😎. კითხვების შემთხვევაში, გთხოვთ, დაგვიკავშირდით"
        />
      );
    },
  });
}
