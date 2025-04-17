"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import * as m from "@/paraglide/messages.js";
import { DriverVerificationRequest, User } from "@prisma/client";
import { UploadForm } from "@/app/_components/AS3UploadForm";
import { DriverVerificationRequestCreateSchema } from "@zenstackhq/runtime/zod/models";
import {
    useCreateDriverVerificationRequest,
    useUpdateDriverVerificationRequest,
} from "@/lib/hooks";
import { useRouter } from "next/navigation";

const FormSchema = DriverVerificationRequestCreateSchema.extend({
    licencePhotos: z.tuple([
        z.object({
            value: z.string().min(1),
        }),
        z.object({
            value: z.string().min(1),
        }),
    ]),
});

export function SendDriverRequestForm({
    driverVerificationRequest,
    user,
}: {
    driverVerificationRequest: DriverVerificationRequest | null;
    user: User;
}) {
    const router = useRouter();
    const { mutate: create, isPending: isCreating } =
        useCreateDriverVerificationRequest();
    const { mutate: update, isPending: isUpdating } =
        useUpdateDriverVerificationRequest();

    const isSubmitting = isCreating || isUpdating;

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            selfie: driverVerificationRequest?.selfie || undefined,
            licencePhotos: (driverVerificationRequest?.licencePhotos?.map(
                (m) => ({
                    value: m,
                })
            ) as [{ value: string }, { value: string }]) || [
                { value: "" },
                { value: "" },
            ],
            driverId: user.id,
            status: "PENDING",
        },
    });

    async function onSubmit(values: z.infer<typeof FormSchema>) {
        const toastId = toast.loading(m.short_curly_shad_bubble());
        if (driverVerificationRequest) {
            update(
                {
                    where: {
                        id: driverVerificationRequest.id,
                    },
                    data: {
                        selfie: values.selfie,
                        licencePhotos: values.licencePhotos.map((e) => e.value),
                        status: "PENDING",
                    },
                },
                {
                    onSuccess: () => {
                        router.push("/profile");
                        toast.success(m.plane_proof_cow_promise(), {
                            id: toastId,
                        });
                    },
                    onError: () => {
                        toast.error(m.sour_grassy_skate_gasp(), {
                            id: toastId,
                        });
                    },
                }
            );
        } else {
            create(
                {
                    data: {
                        selfie: values.selfie,
                        licencePhotos: values.licencePhotos.map((e) => e.value),
                        status: "PENDING",
                    },
                },
                {
                    onSuccess: () => {
                        router.push("/profile");
                        toast.success(m.aware_dirty_wasp_arrive(), {
                            id: toastId,
                        });
                    },
                    onError: () => {
                        toast.error(m.cute_polite_weasel_mend(), {
                            id: toastId,
                        });
                    },
                }
            );
        }
    }

    const { fields, update: updateLP } = useFieldArray<
        z.infer<typeof FormSchema>
    >({
        control: form.control,
        name: "licencePhotos",
    });

    // console.log(form.formState.errors);
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 text-left mx-auto mb-20"
            >
                <FormField
                    control={form.control}
                    name="selfie"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{m.true_day_sparrow_kiss()}</FormLabel>
                            <FormControl>
                                <UploadForm
                                    defaultUrl={field.value}
                                    onSuccessfulUpload={field.onChange}
                                />
                            </FormControl>
                            <FormDescription>
                                {m.funny_muddy_lionfish_pat()}
                            </FormDescription>
                            <FormMessage
                                errorMessage={m.mealy_witty_pug_kick()}
                            />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="licencePhotos"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                {m.heroic_simple_sawfish_thrive()}
                            </FormLabel>
                            <FormControl>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <UploadForm
                                        className="w-full"
                                        defaultUrl={field.value[0].value}
                                        onSuccessfulUpload={(url) => {
                                            updateLP(0, { value: url });
                                            if (
                                                form.formState.errors
                                                    .licencePhotos
                                            ) {
                                                form.trigger("licencePhotos");
                                            }
                                        }}
                                    />
                                    <UploadForm
                                        className="w-full"
                                        defaultUrl={field.value[1].value}
                                        onSuccessfulUpload={(url) => {
                                            updateLP(1, { value: url });
                                            if (
                                                form.formState.errors
                                                    .licencePhotos
                                            ) {
                                                form.trigger("licencePhotos");
                                            }
                                        }}
                                    />
                                </div>
                            </FormControl>
                            <FormDescription>
                                {m.house_key_cockroach_persist()}
                            </FormDescription>
                            <FormMessage
                                errorMessage={m.major_dirty_boar_boil()}
                            />
                        </FormItem>
                    )}
                />

                <Button disabled={isSubmitting} type="submit">
                    {m.true_empty_larva_intend()}
                </Button>
            </form>
        </Form>
    );
}
