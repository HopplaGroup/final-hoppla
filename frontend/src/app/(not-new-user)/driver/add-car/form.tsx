"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Button } from "@/components/ui/actions/button";
import { useMask } from "@react-input/mask";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLoading } from "@/lib/providers/loading-provider";

import * as m from "@/paraglide/messages.js";
import { CreateCarSchema } from "./schema";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DriverVerificationRequest, User } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { UploadForm } from "@/components/S3UploadForm";
import { createCar } from "./actions";
import { CAR_LIST } from "./car-list";
import { Autocomplete } from "@/components/ui/data-input/autocomplete";

export function CreateCarForm({ user }: { user: User }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [capacityOptions, setCapacityOptions] = useState([3, 4]);
  const { push } = useLoading();

  const form = useForm<z.infer<typeof CreateCarSchema>>({
    resolver: zodResolver(CreateCarSchema),
    defaultValues: {
      ownerId: user.id,
    },
  });
  console.log(form.formState.errors);
  async function onSubmit(values: z.infer<typeof CreateCarSchema>) {
    if (isSubmitting) return;
    setIsSubmitting(true);
    const toastId = toast.loading("Creating...");
    const result = await createCar(values);

    if (result.success) {
      toast.success("Car created", {
        id: toastId,
      });
      push("/profile");
    } else {
      toast.error("Failed to create...", {
        id: toastId,
      });
      setIsSubmitting(false);
    }
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
      value: "SEDAN",
      label: "Sedan",
    },
    {
      value: "MINIVAN",
      label: "Minivan",
    },
  ];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 text-left mx-auto mb-20"
      >
        <FormField
          control={form.control}
          name="photos"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Car Photo</FormLabel>
              <FormControl>
                <UploadForm
                  defaultUrl={field.value?.[0]}
                  onSuccessfulUpload={(url) => field.onChange([url])}
                />
              </FormControl>
              <FormDescription>
                Upload a clear and recent photo for your car
              </FormDescription>
              <FormMessage errorMessage="Selfie is required for verification. Please upload a clear photo." />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Car name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="My BMW" />
              </FormControl>
              <FormDescription>
                Upload a clear and recent photo for your car
              </FormDescription>
              <FormMessage errorMessage="Selfie is required for verification. Please upload a clear photo." />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mark"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Car Mark</FormLabel>
              <FormControl>
                <Autocomplete
                  items={CAR_LIST}
                  displayValue={(c) => c}
                  getKey={(c) => c}
                  onChange={(c) => field.onChange(c)}
                  showMax={10}
                  filterItems={(items, query) =>
                    items.filter((c) =>
                      c
                        .toLocaleLowerCase()
                        .startsWith(query.toLocaleLowerCase())
                    )
                  }
                />
              </FormControl>
              <FormDescription>
                Upload a clear and recent photo for your car
              </FormDescription>
              <FormMessage errorMessage="Selfie is required for verification. Please upload a clear photo." />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Car Type</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(v) => {
                    if (v === "SEDAN") setCapacityOptions([3, 4]);
                    else if (v === "MINIVAN") setCapacityOptions([6, 7, 8]);
                    form.resetField("capacity");
                    field.onChange(v);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {CAR_TYPE.map(({ label, value }) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>
                Upload a clear and recent photo for your car
              </FormDescription>
              <FormMessage errorMessage="Selfie is required for verification. Please upload a clear photo." />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="capacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Capacity</FormLabel>
              <FormControl>
                <Select
                  value={field.value?.toString()}
                  onValueChange={(v) => field.onChange(Number(v))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a capacity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {capacityOptions.map((o) => (
                        <SelectItem key={o} value={o.toString()}>
                          {o}
                        </SelectItem>
                      ))}
                      {/* <SelectLabel>Ca</SelectLabel> */}
                      {/* <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="blueberry">Blueberry</SelectItem>
                      <SelectItem value="grapes">Grapes</SelectItem>
                      <SelectItem value="pineapple">Pineapple</SelectItem> */}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>
                Upload a clear and recent photo for your car
              </FormDescription>
              <FormMessage errorMessage="Selfie is required for verification. Please upload a clear photo." />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="plate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Plate Number</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  ref={inputRef}
                  placeholder="AB-000-AB"
                  onChange={(event) => {
                    field.onChange(event.target.value.toUpperCase());
                  }}
                />
              </FormControl>
              <FormDescription>
                {`Enter your car's plate number (format: AB-000-AB).`}
              </FormDescription>
              <FormMessage errorMessage="Please enter a valid plate number in the format AB-000-AB." />
            </FormItem>
          )}
        />

        <Button disabled={isSubmitting} type="submit">
          {m.kind_gaudy_puma_exhale()}
        </Button>
      </form>
    </Form>
  );
}
