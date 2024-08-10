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
import {
  createDriverVerificationRequest,
  updateDriverVerificationRequest,
} from "./actions";
import { DriverVerificationRequest, User } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { UploadForm } from "@/components/S3UploadForm";

export function SendDriverRequestForm({
  driverVerificationRequest,
  user,
}: {
  driverVerificationRequest: DriverVerificationRequest | null;
  user: User;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { push } = useLoading();

  const form = useForm<z.infer<typeof CreateDriverVerifciationRequestSchema>>({
    resolver: zodResolver(CreateDriverVerifciationRequestSchema),
    defaultValues: {
      selfie: driverVerificationRequest?.selfie || undefined,
      licencePhotos: (driverVerificationRequest?.licencePhotos as [
        string,
        string
      ]) || [undefined, undefined],
      // licenceNumber: driverVerificationRequest?.licenceNumber || undefined,
      driverId: user.id,
    },
  });
  console.log(form.formState.errors);
  async function onSubmit(
    values: z.infer<typeof CreateDriverVerifciationRequestSchema>
  ) {
    if (isSubmitting) return;
    setIsSubmitting(true);
    const toastId = toast.loading("Sending...");
    const result = driverVerificationRequest
      ? await updateDriverVerificationRequest({
          ...values,
          id: driverVerificationRequest.id,
        })
      : await createDriverVerificationRequest(values);
    if (result.success) {
      toast.success("Succesffyly sent", {
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
    mask: "__-$$$-__",
    replacement: {
      _: /[a-zA-Z]/,
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
              <FormDescription>
                Upload a clear and recent selfie for identity verification.
              </FormDescription>
              <FormMessage errorMessage="Selfie is required for verification. Please upload a clear photo." />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="licencePhotos"
          render={({ field }) => (
            <FormItem>
              <FormLabel>License Photos</FormLabel>
              <FormControl>
                <div className="grid md:grid-cols-2 gap-4">
                  <UploadForm
                    className="w-full"
                    defaultUrl={field.value[0]}
                    onSuccessfulUpload={(url) => {
                      field.onChange([url, field.value[1]]);
                    }}
                  />
                  <UploadForm
                    className="w-full"
                    defaultUrl={field.value[1]}
                    onSuccessfulUpload={(url) => {
                      field.onChange([field.value[0], url]);
                    }}
                  />
                </div>
              </FormControl>
              <FormDescription>
                {`                Upload photos of the front and back of your driver's license.
`}
              </FormDescription>
              <FormMessage errorMessage="Both front and back license photos are required. Please upload them." />
            </FormItem>
          )}
        />
        {/* 
        <FormField
          control={form.control}
          name="licenceNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>License Number</FormLabel>
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
                {`Enter your driver's license number (format: AB-000-AB).`}
              </FormDescription>
              <FormMessage errorMessage="Please enter a valid license number in the format AB-000-AB." />
            </FormItem>
          )}
        /> */}

        <Button disabled={isSubmitting} type="submit">
          {m.kind_gaudy_puma_exhale()}
        </Button>
      </form>
    </Form>
  );
}
