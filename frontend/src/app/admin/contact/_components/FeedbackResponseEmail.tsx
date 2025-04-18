// app/admin/contact/_components/FeedbackResponseEmail.tsx
import React from "react";
import { User } from "@prisma/client";

type FeedbackResponseEmailProps = {
    userName: string;
    message: string;
    responseText: string;
};

export default function FeedbackResponseEmail({
    userName,
    message,
    responseText,
}: FeedbackResponseEmailProps) {
    return (
        <div
            style={{
                fontFamily: "Arial, sans-serif",
                maxWidth: "600px",
                margin: "0 auto",
            }}
        >
            <h2>Hello {userName},</h2>
            <p>
                Thank you for contacting us. Below is our response to your
                inquiry:
            </p>

            <div
                style={{
                    padding: "15px",
                    background: "#f5f5f5",
                    borderRadius: "5px",
                    margin: "20px 0",
                }}
            >
                <p>
                    <strong>Your message:</strong>
                </p>
                <p>{message}</p>
            </div>

            <div
                style={{
                    padding: "15px",
                    background: "#e8f4ff",
                    borderRadius: "5px",
                    margin: "20px 0",
                }}
            >
                <p>
                    <strong>Our response:</strong>
                </p>
                <p>{responseText}</p>
            </div>

            <p>{`If you have any further questions, please don't hesitate to contact us again.`}</p>
            <p>
                Best regards,
                <br />
                Support Team
            </p>
        </div>
    );
}
