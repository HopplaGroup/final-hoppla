// app/admin/contact-submissions/_actions/submissions.ts
"use server";

import { revalidatePath } from "next/cache";
import db from "@/lib/utils/db";
import { render } from "@react-email/components";
import FeedbackResponseEmail from "../_components/FeedbackResponseEmail";
import { sendEmailToEmail } from "@/lib/functions/emails/send-email";

export async function updateSubmissionStatus(formData: FormData) {
    const submissionId = formData.get("submissionId") as string;
    const status = formData.get("status") as string;

    if (!submissionId || !status) {
        throw new Error("Missing required fields");
    }

    await db.contactSubmission.update({
        where: { id: submissionId },
        data: { status: status as any },
    });

    revalidatePath("/admin/contact-submissions");
}

export async function sendResponseEmail(formData: FormData) {
    const submissionId = formData.get("submissionId") as string;
    const responseText = formData.get("responseText") as string;

    if (!submissionId || !responseText) {
        throw new Error("Missing required fields");
    }

    const submission = await db.contactSubmission.findUnique({
        where: { id: submissionId },
    });

    if (!submission) {
        throw new Error("Submission not found");
    }

    await sendEmailToEmail({
        email: submission.email,
        subject: `Re: Your ${submission.type.toLowerCase()} inquiry`,
        htmlRender: (
            <FeedbackResponseEmail
                userName={submission.name}
                message={submission.message}
                responseText={responseText}
            />
        ),
        senderName: "Hoppla Contact",
    });

    await db.contactSubmission.update({
        where: { id: submissionId },
        data: { status: "REPLIED" },
    });

    revalidatePath("/admin/contact-submissions");
}

export async function deleteSubmission(formData: FormData) {
    const submissionId = formData.get("submissionId") as string;

    if (!submissionId) {
        throw new Error("Missing submission ID");
    }

    await db.contactSubmission.delete({
        where: { id: submissionId },
    });

    revalidatePath("/admin/contact-submissions");
}
