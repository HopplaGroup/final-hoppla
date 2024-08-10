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
import { CreateRideSchema } from "./schema";
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
import { createRide } from "./actions";
import { Autocomplete } from "@/components/ui/data-input/autocomplete";
import { Circle, MapPin } from "lucide-react";
import PLACES from "@/lib/constants/places";
import { languageTag } from "@/paraglide/runtime";

export function CreateRideForm({ user }: { user: User }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [capacityOptions, setCapacityOptions] = useState([3, 4]);
  const { push } = useLoading();

  const form = useForm<z.infer<typeof CreateRideSchema>>({
    resolver: zodResolver(CreateRideSchema),
    defaultValues: {
      driverId: user.id,
    },
  });
  console.log(form.formState.errors);
  async function onSubmit(values: z.infer<typeof CreateRideSchema>) {
    if (isSubmitting) return;
    setIsSubmitting(true);
    const toastId = toast.loading("Creating...");
    const result = await createRide(values);

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
      value: "STANDARD",
      label: "Standard",
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
        <div className="grid grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="from"
            render={({ field }) => (
              <FormItem>
                <FormLabel>From</FormLabel>
                <FormControl>
                  <Autocomplete
                    startContent={<Circle size={18} />}
                    items={PLACES}
                    displayValue={(item) => item.name[languageTag()]}
                    onChange={(place) => field.onChange(place?.osm || "")}
                    getKey={(item) => item.osm}
                    showMax={10}
                    filterItems={(items, query) =>
                      items.filter(
                        (item) =>
                          item.name.en
                            .toLowerCase()
                            .startsWith(query.toLowerCase()) ||
                          item.name.ka
                            .toLowerCase()
                            .startsWith(query.toLowerCase())
                      )
                    }
                    placeholder="Departure location"
                  />
                </FormControl>
                <FormDescription>
                  Please enter the departure location
                </FormDescription>
                <FormMessage errorMessage="amazing" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="to"
            render={({ field }) => (
              <FormItem>
                <FormLabel>To</FormLabel>
                <FormControl>
                  <Autocomplete
                    startContent={<MapPin size={18} />}
                    items={PLACES}
                    displayValue={(item) => item.name[languageTag()]}
                    onChange={(place) => field.onChange(place?.osm || "")}
                    getKey={(item) => item.osm}
                    showMax={10}
                    filterItems={(items, query) =>
                      items.filter(
                        (item) =>
                          item.name.en
                            .toLowerCase()
                            .startsWith(query.toLowerCase()) ||
                          item.name.ka
                            .toLowerCase()
                            .startsWith(query.toLowerCase())
                      )
                    }
                    placeholder="Destination location"
                  />
                </FormControl>
                <FormDescription>Please enter the destination</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Car Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="My BMW" />
              </FormControl>
              <FormDescription>
                Provide a name for your car, like "My BMW" or "Family Van."
              </FormDescription>
              <FormMessage errorMessage="Please enter a name for your car." />
            </FormItem>
          )}
        /> */}

        {/* <FormField
          control={form.control}
          name="mark"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Car Make</FormLabel>
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
                Select the make of your car, e.g., BMW, Toyota.
              </FormDescription>
              <FormMessage errorMessage="Please select a valid car make." />
            </FormItem>
          )}
        /> */}

        {/* <FormField
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
                Choose the type of your car, such as Sedan or Minivan.
              </FormDescription>
              <FormMessage errorMessage="Please select a valid car type." />
            </FormItem>
          )}
        /> */}

        {/* <FormField
          control={form.control}
          name="capacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Seating Capacity</FormLabel>
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
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>
                Specify how many passengers your car can seat.
              </FormDescription>
              <FormMessage errorMessage="Please select a seating capacity." />
            </FormItem>
          )}
        /> */}
        {/* 
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
                {`Enter your car's plate number in the format AB-000-AB.`}
              </FormDescription>
              <FormMessage errorMessage="Please enter a valid plate number in the format AB-000-AB." />
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
