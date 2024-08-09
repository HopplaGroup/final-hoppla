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
import { useState } from "react";
import toast from "react-hot-toast";
import { useLoading } from "@/lib/providers/loading-provider";

import * as m from "@/paraglide/messages.js";
import { CreateDriverVerifciationRequestSchema } from "./schema";
import { createDriverVerificationRequest } from "./actions";
import { DriverVerificationRequest } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { UploadForm } from "@/components/S3UploadForm";

export function SendDriverRequestForm({
  driverVerificationRequest,
}: {
  driverVerificationRequest: DriverVerificationRequest | null;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { push } = useLoading();

  const form = useForm<z.infer<typeof CreateDriverVerifciationRequestSchema>>({
    resolver: zodResolver(CreateDriverVerifciationRequestSchema),
    defaultValues: {},
  });

  async function onSubmit(
    values: z.infer<typeof CreateDriverVerifciationRequestSchema>
  ) {
    if (isSubmitting) return;
    setIsSubmitting(true);
    const toastId = toast.loading("Sending...");
    const result = driverVerificationRequest
      ? await createDriverVerificationRequest(values)
      : await createDriverVerificationRequest(values);
    if (result.success) {
      toast.success("Succesffyly sended", {
        id: toastId,
      });
      push("/profile");
    } else {
      toast.error("Failed to send...", {
        id: toastId,
      });
      setIsSubmitting(false);
    }
  }

  const inputRef = useMask({
    // looks like this AAA-000-AAA A is Capital letter and 0 is digit
    mask: "@@@-$$$-@@@",
    replacement: {
      "@": /[A-Z]/,
      $: /\d/,
    },
  });

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
              <FormLabel>Selfie</FormLabel>
              <FormControl>
                <UploadForm
                  defaultUrl={field.value}
                  onSuccessfulUpload={field.onChange}
                />
              </FormControl>
              <FormDescription>soem description</FormDescription>
              <FormMessage errorMessage={"some eror messgae"} />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="licencePhotos"
          render={({ field }) => (
            <FormItem>
              <FormLabel>licencePhotos</FormLabel>
              <FormControl>
                <div className="grid grid-cols-2 gap-4">
                  <UploadForm
                    defaultUrl={
                      (field.value?.length > 0 && field.value[0]) || undefined
                    }
                    onSuccessfulUpload={(url) => {
                      field.onChange([url, field.value?.[1]]);
                    }}
                  />
                  <UploadForm
                    defaultUrl={
                      (field.value?.length > 1 && field.value[1]) || undefined
                    }
                    onSuccessfulUpload={(url) => {
                      field.onChange([field.value[0], url]);
                    }}
                  />
                </div>
              </FormControl>
              <FormDescription>soem description</FormDescription>
              <FormMessage errorMessage={"some eror messgae"} />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="licenceNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>licenceNumber</FormLabel>
              <FormControl>
                <Input {...field} ref={inputRef} />
              </FormControl>
              <FormDescription>soem description</FormDescription>
              <FormMessage errorMessage={"some eror messgae"} />
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
