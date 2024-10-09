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
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useUpdateUser } from "@/lib/hooks";
import { UserUpdateSchema } from "@zenstackhq/runtime/zod/models";
import { zodPhoneSchema } from "@/lib/utils/phone-schema";
const RefinedUserUpdateSchema = UserUpdateSchema.pick({
    name: true,
    sex: true,
    birthDate: true,
    bio: true,
})
    .required()
    .extend({
        mobileNumber: zodPhoneSchema,
    });

export function UpdateUserForm({ userId }: { userId: string }) {
    const { mutate, isPending } = useUpdateUser();
    const { push } = useLoading();

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
            name: "",
            sex: "MAN",
            birthDate: undefined,
            mobileNumber: "",
            bio: m.polite_lofty_liger_surge(),
        },
    });

    function onSubmit(values: z.infer<typeof RefinedUserUpdateSchema>) {
        const toastId = toast.loading(m.ideal_long_ant_rest());
        mutate(
            {
                where: {
                    id: userId,
                },
                data: {
                    ...values,
                    isNewUser: false,
                },
            },
            {
                onSuccess: () => {
                    toast.success(m.this_tidy_mammoth_trust(), {
                        id: toastId,
                    });
                    push("/profile");
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
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    {m.sour_pretty_tortoise_devour()}
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        // startContent={<FolderPen size={18} />}
                                        placeholder={m.soft_mean_mayfly_clap()}
                                        {...field}
                                    />
                                </FormControl>
                                {/* <FormDescription>{m.polite_safe_vole_stab()}</FormDescription> */}
                                <FormMessage
                                    errorMessage={m.clear_just_donkey_prosper()}
                                />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="mobileNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    {m.flaky_full_guppy_lend()}
                                </FormLabel>
                                <FormControl>
                                    <PhoneInput {...field} />
                                </FormControl>

                                <FormMessage
                                    errorMessage={m.teal_top_starfish_pout()}
                                />
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
                            <FormMessage
                                errorMessage={m.acidic_sweet_guppy_blend()}
                            />
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
                                <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue
                                            placeholder={m.jolly_slow_camel_earn()}
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {sexOptions.map((e) => (
                                            <SelectItem
                                                key={e.value}
                                                value={e.value}
                                            >
                                                {e.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            {/* <FormDescription>
                {m.smart_green_albatross_type()}
              </FormDescription> */}
                            <FormMessage
                                errorMessage={m.actual_royal_mole_bake()}
                            />
                        </FormItem>
                    )}
                />
                <p className="text-sm text-primary">
                    {m.whole_fresh_macaw_cure()}
                </p>
                <div className="col-span-6">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {m.aware_tense_dolphin_grow()}{" "}
                        <a
                            href="/terms"
                            className="text-gray-700 underline dark:text-gray-200"
                        >
                            {m.bald_knotty_nils_fond()}{" "}
                        </a>
                        {/* {m.male_bold_robin_spur()}
            <a href="#" className="text-gray-700 underline dark:text-gray-200">
              {" "}
              {m.careful_gaudy_cobra_clap()}
              {"/terms"}
            </a> */}
                        .
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <Button disabled={isPending} type="submit">
                        {m.kind_gaudy_puma_exhale()}
                    </Button>
                    <Button disabled={isPending} type="button" variant="ghost">
                        <LogoutLink className="w-full h-full flex items-center justify-center">
                            {m.extra_lucky_rook_trust()}
                        </LogoutLink>
                    </Button>
                </div>
            </form>
        </Form>
    );
}
