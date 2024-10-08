"use server";
import { User } from "@prisma/client";
// @ts-ignore
import nodemailer from "nodemailer";
import { render } from "@react-email/components";
import db from "@/lib/utils/db";

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
    to: string[];
    subject: string;
    htmlRender: ({ user }: { user: User }) => JSX.Element;
    senderName?: string;
}) {
    if (to.length === 0) throw new Error("No recipients provided");

    const users = await db.user.findMany({
        where: {
            id: {
                in: to,
            },
        },
    });

    for (const user of users) {
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
