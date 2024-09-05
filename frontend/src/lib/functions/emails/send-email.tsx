"use server";
import { User } from "@prisma/client";
// @ts-ignore
import nodemailer from "nodemailer";
import { render } from "@react-email/components";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: "hopplagroup@gmail.com",
        pass: "jvbskrsrlqfyyeuw",
    },
});

export async function sendEmail({
    to,
    subject,
    htmlRender,
    senderName = "Hoppla Booking",
}: {
    to: User[];
    subject: string;
    htmlRender: ({ user }: { user: User }) => JSX.Element;
    senderName?: string;
}) {
    if (to.length === 0) throw new Error("No recipients provided");

    for (const user of to) {
        await transporter.sendMail({
            from: `"${senderName}" <hopplagroup@gmail.com>`,
            to: user.email,
            subject,
            html: await render(htmlRender({ user }), {
                pretty: true,
            }),
        });
    }
}
