"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/actions/button";
import { PhoneInput } from "@/components/ui/data-input/phone-input";
import { DatePicker } from "@/components/ui/date-picker";
import toast from "react-hot-toast";
import { useLoading } from "@/lib/providers/loading-provider";
import * as m from "@/paraglide/messages.js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useUpdateUser } from "@/lib/hooks";
import { UserUpdateSchema } from "@zenstackhq/runtime/zod/models";
import { zodPhoneSchema } from "@/lib/utils/phone-schema";
import { User } from "@prisma/client";
import { UploadForm } from "@/components/S3UploadForm";
import { useRouter } from "next/navigation";
const RefinedUserUpdateSchema = UserUpdateSchema.pick({
  name: true,
  sex: true,
  birthDate: true,
  bio: true,
  profileImg: true,
})
  .required()
  .extend({
    mobileNumber: zodPhoneSchema,
  });

export function ProfileSettingsForm({ user }: { user: User }) {
  const { mutate, isPending } = useUpdateUser();
  const { push } = useLoading();
  const router = useRouter();

  const sexOptions = [
    {
      value: "MAN",
      label: m.tough_active_grebe_bend(),
    },
    {
      value: "WOMAN",
      label: m.east_smart_rat_reap(),
    },
    {
      value: "OTHER",
      label: m.clear_any_kitten_favor(),
    },
  ];

  const form = useForm<z.infer<typeof RefinedUserUpdateSchema>>({
    resolver: zodResolver(RefinedUserUpdateSchema),
    defaultValues: {
      name: user.name,
      sex: user.sex,
      birthDate: user.birthDate,
      mobileNumber: user.mobileNumber,
      bio: user.bio,
      profileImg: user.profileImg,
    },
  });

  function onSubmit(values: z.infer<typeof RefinedUserUpdateSchema>) {
    const toastId = toast.loading(m.ideal_long_ant_rest());
    mutate(
      {
        where: {
          id: user.id,
        },
        data: {
          ...values,
        },
      },
      {
        onSuccess: () => {
          router.refresh();
          toast.success(m.this_tidy_mammoth_trust(), {
            id: toastId,
          });
        },
        onError: () => {
          toast.error(m.known_every_emu_bless(), {
            id: toastId,
          });
        },
      }
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 text-left mx-auto mb-20"
      >
        <FormField
          control={form.control}
          name="profileImg"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{m.sour_pretty_tortoise_devour()}</FormLabel>
              <FormControl>
                <UploadForm
                  folderName="profile-pictures"
                  defaultUrl={field.value}
                  onSuccessfulUpload={(url) => field.onChange(url)}
                  className="size-[162px] border-4 border-solid border-white"
                />
              </FormControl>
              {/* <FormDescription>{m.polite_safe_vole_stab()}</FormDescription> */}
              <FormMessage errorMessage={m.clear_just_donkey_prosper()} />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{m.sour_pretty_tortoise_devour()}</FormLabel>
                <FormControl>
                  <Input
                    // startContent={<FolderPen size={18} />}
                    placeholder={m.soft_mean_mayfly_clap()}
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>{m.polite_safe_vole_stab()}</FormDescription> */}
                <FormMessage errorMessage={m.clear_just_donkey_prosper()} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mobileNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{m.flaky_full_guppy_lend()}</FormLabel>
                <FormControl>
                  <PhoneInput {...field} />
                </FormControl>
                {/* <FormDescription>{m.new_neat_porpoise_fetch()}</FormDescription> */}
                <FormMessage errorMessage={m.teal_top_starfish_pout()} />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{m.clean_aqua_squid_catch()}</FormLabel>
              <FormControl>
                <DatePicker
                  placeholder={m.last_ornate_lion_dine()}
                  {...field}
                />
              </FormControl>
              {/* <FormDescription>{m.big_weak_stingray_kiss()}</FormDescription> */}
              <FormMessage errorMessage={m.acidic_sweet_guppy_blend()} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sex"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{m.novel_gross_donkey_race()}</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    {sexOptions.map((e) => (
                      <SelectItem key={e.value} value={e.value}>
                        {e.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              {/* <FormDescription>
                {m.smart_green_albatross_type()}
              </FormDescription> */}
              <FormMessage errorMessage={m.actual_royal_mole_bake()} />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-2">
          <Button disabled={isPending} type="submit">
            Save Profile
          </Button>
        </div>
      </form>
    </Form>
  );
}
