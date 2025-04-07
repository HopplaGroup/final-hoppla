"use client";
import { Plus } from "lucide-react";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import * as m from "@/paraglide/messages.js";

import { useCreateCar, useFindUniqueCar } from "@/lib/hooks";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { CarCreateSchema } from "@zenstackhq/runtime/zod/models";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useMask } from "@react-input/mask";
import { UploadForm } from "@/components/S3UploadForm";
import { Input } from "@/components/ui/input";
import { Autocomplete } from "@/components/ui/data-input/autocomplete";
import { CAR_LIST } from "../../../../lib/constants/car-list";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const FormSchema = CarCreateSchema.extend({
    photos: z.array(z.string()).nonempty(),
    licencePhotos: z.tuple([
        z.object({
            value: z.string(),
        }),
        z.object({
            value: z.string(),
        }),
    ]),
});

export default function AddCar() {
    const { mutate } = useCreateCar({
        optimisticUpdate: true,
    });

    const [open, setOpen] = useState(false);
    const [capacityOptions, setCapacityOptions] = useState([3, 4]);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            licencePhotos: [
                {
                    value: "",
                },
                {
                    value: "",
                },
            ],
        },
    });

    const { control } = form;

    const { fields, update } = useFieldArray<z.infer<typeof FormSchema>>({
        control,
        name: "licencePhotos",
    });

    // console.log(form.formState.errors);

    function onSubmit(values: z.infer<typeof FormSchema>) {
        mutate({
            data: {
                capacity: values.capacity,
                mark: values.mark,
                name: values.name,
                plate: values.plate,
                type: values.type,
                photos: values.photos,
                fuelType: values.fuelType,
                licensePhotos: values.licencePhotos.map((p) => p.value),
            },
        });
        form.reset();

        setOpen(false);
    }

    const inputRef = useMask({
        mask: "__-$$$-__",
        replacement: {
            _: /[a-zA-Z]/,
            $: /\d/,
        },
    });

    const CAR_TYPE = [
        {
            value: "STANDARD",
            label: "Standard",
        },
        {
            value: "MINIVAN",
            label: "Minivan",
        },
    ];

    const FUEL_TYPE = [
        {
            value: "GASOLINE",
            label: "Gasoline",
        },
        {
            value: "DIESEL",
            label: "Diesel",
        },
        {
            value: "ELECTRIC",
            label: "Electric",
        },
        {
            value: "HYBRID",
            label: "Hybrid",
        },
        {
            value: "HYDROGEN",
            label: "Hydrogen",
        },
        {
            value: "CNG",
            label: "CNG",
        },
        {
            value: "LPG",
            label: "LPG",
        },
        {
            value: "ETHANOL",
            label: "Ethanol",
        },
    ];

    // console.log(form.getValues());

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger>
                <div className="cursor-pointer flex items-center justify-center h-36 bg-white hover:bg-white/50 duration-200 transition-all rounded-xl border-2  ">
                    <Plus size={24} />
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 overflow-auto"
                    >
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                {m.jolly_sunny_parakeet_spin()}
                            </AlertDialogTitle>
                        </AlertDialogHeader>
                        <div className="space-y-4">
                            {/* <FormField
                                control={form.control}
                                name="licencePhotos"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {m.mushy_deft_zebra_buy()}
                                        </FormLabel>
                                        <FormControl>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <UploadForm
                                                    className="w-full"
                                                    folderName="car-licence"
                                                    defaultUrl={
                                                        field.value[0].value
                                                    }
                                                    onSuccessfulUpload={(
                                                        url
                                                    ) => {
                                                        update(0, {
                                                            value: url,
                                                        });
                                                        if (
                                                            form.formState
                                                                .errors
                                                                .licencePhotos
                                                        ) {
                                                            form.trigger(
                                                                "licencePhotos"
                                                            );
                                                        }
                                                    }}
                                                />
                                                <UploadForm
                                                    className="w-full"
                                                    folderName="car-licence"
                                                    defaultUrl={
                                                        field.value[1].value
                                                    }
                                                    onSuccessfulUpload={(
                                                        url
                                                    ) => {
                                                        update(1, {
                                                            value: url,
                                                        });
                                                        if (
                                                            form.formState
                                                                .errors
                                                                .licencePhotos
                                                        ) {
                                                            form.trigger(
                                                                "licencePhotos"
                                                            );
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormDescription>
                                            {m.kind_white_macaw_hush()}
                                        </FormDescription>
                                        <FormMessage errorMessage="Both front and back license photos are required. Please upload them." />
                                    </FormItem>
                                )}
                            /> */}
                            <FormField
                                control={form.control}
                                name="photos"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {m.level_royal_kestrel_amuse()}
                                        </FormLabel>
                                        <FormControl>
                                            <UploadForm
                                                defaultUrl={field.value?.[0]}
                                                folderName="car-photos"
                                                onSuccessfulUpload={(url) =>
                                                    field.onChange([url])
                                                }
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            {m.hour_zesty_kitten_work()}
                                        </FormDescription>
                                        <FormMessage
                                            errorMessage={m.lower_elegant_leopard_win()}
                                        />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {m.even_agent_clownfish_nudge()}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder={m.formal_less_elephant_amuse()}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            {m.new_such_swallow_rush()}
                                        </FormDescription>
                                        <FormMessage
                                            errorMessage={m.main_fine_turtle_dust()}
                                        />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="mark"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {m.seemly_zany_puma_bask()}
                                        </FormLabel>
                                        <FormControl>
                                            <Autocomplete
                                                items={CAR_LIST}
                                                displayValue={(c) => c}
                                                getKey={(c) => c}
                                                onChange={(c) =>
                                                    field.onChange(c)
                                                }
                                                // showMax={10}
                                                placeholder={m.agent_white_lobster_savor()}
                                                filterItems={(items, query) =>
                                                    items.filter((c) =>
                                                        c
                                                            .toLocaleLowerCase()
                                                            .startsWith(
                                                                query.toLocaleLowerCase()
                                                            )
                                                    )
                                                }
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            {m.zany_smart_beetle_peel()}
                                        </FormDescription>
                                        <FormMessage
                                            errorMessage={m.frail_such_goldfish_pave()}
                                        />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {m.bold_male_warbler_hurl()}
                                        </FormLabel>
                                        <FormControl>
                                            <Select
                                                value={field.value}
                                                onValueChange={(v) => {
                                                    if (v === "STANDARD") {
                                                        setCapacityOptions([
                                                            3, 4,
                                                        ]);
                                                    } else if (
                                                        v === "MINIVAN"
                                                    ) {
                                                        setCapacityOptions([
                                                            6, 7, 8,
                                                        ]);
                                                    }
                                                    form.resetField("capacity");
                                                    if (
                                                        form.formState.errors
                                                            .capacity
                                                    ) {
                                                        form.trigger(
                                                            "capacity"
                                                        );
                                                    }
                                                    field.onChange(v);
                                                }}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue
                                                        placeholder={m.alert_spry_worm_honor()}
                                                    />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {CAR_TYPE.map(
                                                            ({
                                                                label,
                                                                value,
                                                            }) => (
                                                                <SelectItem
                                                                    key={value}
                                                                    value={
                                                                        value
                                                                    }
                                                                >
                                                                    {label}
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormDescription>
                                            {m.stale_curly_shark_dash()}
                                        </FormDescription>
                                        <FormMessage
                                            errorMessage={m.crisp_strong_clownfish_talk()}
                                        />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="fuelType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {m.vivid_moving_weasel_advise()}
                                        </FormLabel>
                                        <FormControl>
                                            <Select
                                                value={field.value}
                                                onValueChange={(v) => {
                                                    field.onChange(v);
                                                }}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue
                                                        placeholder={m.ok_full_duck_edit()}
                                                    />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {FUEL_TYPE.map(
                                                            ({
                                                                label,
                                                                value,
                                                            }) => (
                                                                <SelectItem
                                                                    key={value}
                                                                    value={
                                                                        value
                                                                    }
                                                                >
                                                                    {label}
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormDescription>
                                            {m.key_ornate_marlin_propel()}
                                        </FormDescription>
                                        <FormMessage
                                            errorMessage={m.mild_late_capybara_kiss()}
                                        />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="capacity"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {m.lost_zippy_mule_fall()}
                                        </FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={(v) => {
                                                    field.onChange(
                                                        v
                                                            ? Number(v)
                                                            : undefined
                                                    );
                                                }}
                                                disabled={
                                                    !form.getValues("type")
                                                }
                                            >
                                                <SelectTrigger className="w-full">
                                                    {field.value ? (
                                                        <SelectValue
                                                            placeholder={m.bold_tangy_bird_soar()}
                                                        />
                                                    ) : (
                                                        m.bold_tangy_bird_soar()
                                                    )}
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {capacityOptions.map(
                                                            (o) => (
                                                                <SelectItem
                                                                    key={o}
                                                                    value={o.toString()}
                                                                >
                                                                    {o}
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormDescription>
                                            {m.antsy_clear_marten_compose()}
                                        </FormDescription>
                                        <FormMessage
                                            errorMessage={m.dirty_direct_myna_pray()}
                                        />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="plate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {m.zany_wacky_sloth_hint()}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                ref={inputRef}
                                                placeholder="AB-000-AB"
                                                onChange={(event) => {
                                                    const uPlate =
                                                        event.target.value.toUpperCase();
                                                    field.onChange(uPlate);
                                                }}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            {m.yummy_ideal_penguin_enchant()}
                                        </FormDescription>
                                        <FormMessage
                                            errorMessage={m.lime_helpful_macaw_buzz()}
                                        />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <AlertDialogFooter>
                            <AlertDialogCancel>
                                {m.last_caring_snail_dream()}
                            </AlertDialogCancel>
                            <Button type="submit">
                                {m.novel_this_cuckoo_mix()}
                            </Button>
                        </AlertDialogFooter>
                    </form>
                </Form>
            </AlertDialogContent>
        </AlertDialog>
    );
}
