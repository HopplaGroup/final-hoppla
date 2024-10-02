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
      value: z.string().min(1),
    }),
    z.object({
      value: z.string().min(1),
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

  function onSubmit(values: z.infer<typeof FormSchema>) {
    form.reset();
    setOpen(false);
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
              <AlertDialogTitle>Add New Car</AlertDialogTitle>
            </AlertDialogHeader>
            <div className="space-y-4">
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
                          folderName="car-licence"
                          defaultUrl={field.value[0].value}
                          onSuccessfulUpload={(url) => {
                            update(0, {
                              value: url,
                            });
                            if (form.formState.errors.licencePhotos) {
                              form.trigger("licencePhotos");
                            }
                          }}
                        />
                        <UploadForm
                          className="w-full"
                          folderName="car-licence"
                          defaultUrl={field.value[1].value}
                          onSuccessfulUpload={(url) => {
                            update(1, {
                              value: url,
                            });
                            if (form.formState.errors.licencePhotos) {
                              form.trigger("licencePhotos");
                            }
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      {`Upload photos of the front and back of your driver's license.`}
                    </FormDescription>
                    <FormMessage errorMessage="Both front and back license photos are required. Please upload them." />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="photos"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Car Photo</FormLabel>
                    <FormControl>
                      <UploadForm
                        defaultUrl={field.value?.[0]}
                        folderName="car-photos"
                        onSuccessfulUpload={(url) => field.onChange([url])}
                      />
                    </FormControl>
                    <FormDescription>
                      Upload a clear and recent photo of your car for listing.
                    </FormDescription>
                    <FormMessage errorMessage="Car photo is required. Please upload a clear and recent photo." />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Car Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="My BMW" />
                    </FormControl>
                    <FormDescription>
                      {`Provide a name for your car, like "My BMW" or "Family Van."`}
                    </FormDescription>
                    <FormMessage errorMessage="Please enter a name for your car." />
                  </FormItem>
                )}
              />

              <FormField
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
                          if (v === "STANDARD") {
                            setCapacityOptions([3, 4]);
                          } else if (v === "MINIVAN") {
                            setCapacityOptions([6, 7, 8]);
                          }
                          form.resetField("capacity");
                          if (form.formState.errors.capacity) {
                            form.trigger("capacity");
                          }
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
              />

              <FormField
                control={form.control}
                name="fuelType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fuel Type</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(v) => {
                          field.onChange(v);
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {FUEL_TYPE.map(({ label, value }) => (
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
              />

              <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seating Capacity</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(v) => {
                          field.onChange(v ? Number(v) : undefined);
                        }}
                        disabled={!form.getValues("type")}
                      >
                        <SelectTrigger className="w-full">
                          {field.value ? (
                            <SelectValue placeholder="Select a capacity" />
                          ) : (
                            " Select a capacity"
                          )}
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
                          const uPlate = event.target.value.toUpperCase();
                          field.onChange(uPlate);
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      {`Enter your car's plate number in the format AB-000-AB.`}
                    </FormDescription>
                    <FormMessage errorMessage="Please enter a valid plate number in the format AB-000-AB." />
                  </FormItem>
                )}
              />
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button type="submit">Submit</Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
