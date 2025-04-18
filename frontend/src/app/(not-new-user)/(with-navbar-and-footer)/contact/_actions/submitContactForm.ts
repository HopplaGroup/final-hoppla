// app/contact/actions.ts
"use server";

import db from "@/lib/utils/db";
import { ContactSubmissionType } from "@prisma/client";
import { revalidatePath } from "next/cache";

type ContactFormData = {
    name: string;
    email: string;
    type: ContactSubmissionType;
    message: string;
};

export default async function submitContactForm(formData: ContactFormData) {
    try {
        if (
            !formData.name ||
            !formData.email ||
            !formData.type ||
            !formData.message
        ) {
            return {
                success: false,
                message: "All fields are required",
            };
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            return {
                success: false,
                message: "Invalid email address",
            };
        }

        await db.contactSubmission.create({
            data: {
                name: formData.name,
                email: formData.email,
                type: formData.type,
                message: formData.message,
            },
        });

        // 2. Send an email notification
        // await sendEmail({
        //   to: "support@hoppla-rides.com",
        //   subject: `New Contact Form: ${formData.subject}`,
        //   text: `
        //     Name: ${formData.name}
        //     Email: ${formData.email}
        //     Subject: ${formData.subject}
        //     Message: ${formData.message}
        //   `,
        // });

        revalidatePath("/contact");

        return {
            success: true,
            message: "Form submitted successfully",
        };
    } catch (error) {
        console.error("Error submitting contact form:", error);
        return {
            success: false,
            message: "An error occurred while submitting the form",
        };
    }
}
