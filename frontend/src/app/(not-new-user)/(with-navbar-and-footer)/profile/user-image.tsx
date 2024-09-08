"use client";
import { UploadForm } from "@/components/S3UploadForm";
import { User } from "@prisma/client";
import { changeProfileImg } from "./actionts";

export function UserImage({ user }: { user: User }) {
    return (
        <UploadForm
            folderName="profile-pictures"
            defaultUrl={user.profileImg}
            make={async (url) => {
                const res = await changeProfileImg({
                    img: url,
                    userId: user.id,
                });
                if (!res.success) {
                    throw new Error("Failed to update profile image");
                }
            }}
            className="size-[162px] border-4 border-solid border-white"
        />
    );
}
