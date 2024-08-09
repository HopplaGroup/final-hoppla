"use server"
import { createServerAction } from "@/lib/utils/create-server-action"
import { UpdateUserSchema } from "./schema"
import db from "@/lib/utils/db"
import { getUser } from "@/lib/utils/auth"
import { revalidatePath } from "next/cache"

export const updateUser = createServerAction(UpdateUserSchema, async (data) => {
  const user = await getUser()

  await db.user.update({
    where: { id: user?.id },
    data: {
      name: data.name,
      bio: data.bio,
      birthDate: data.birthDate,
      sex: data.sex,
      mobileNumber: data.mobileNumber,

      isNewUser: false,
    }
  })

  revalidatePath("/")

})