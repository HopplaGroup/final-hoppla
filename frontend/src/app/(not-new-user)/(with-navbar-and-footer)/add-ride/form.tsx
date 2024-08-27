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
import { NumericFormat } from "react-number-format";
import ReactSelect from "react-select";

import * as m from "@/paraglide/messages.js";
import { CreateRideSchema } from "./schema";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Car, Rule, User } from "@prisma/client";
import { createRide, getDirections } from "./actions";
import { Autocomplete } from "@/components/ui/data-input/autocomplete";
import { Circle, MapPin } from "lucide-react";
import PLACES from "@/lib/constants/places";
import { languageTag } from "@/paraglide/runtime";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";

const PRICE_RANGE = 5;

export function CreateRideForm({
  user,
  cars,
  rules,
}: {
  user: User;
  cars: Car[];
  rules: Rule[];
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { push } = useLoading();
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const form = useForm<z.infer<typeof CreateRideSchema>>({
    resolver: zodResolver(CreateRideSchema),
    defaultValues: {
      driverId: user.id,
    },
  });
  const [realPriceValue, setRealPriceValue] = useState(0);
  const [isPriceLoading, setIsPriceLoading] = useState(false);
  const [isPriceValidated, setIsPriceValidated] = useState(true);
  async function onSubmit(values: z.infer<typeof CreateRideSchema>) {
    if (isSubmitting || !isPriceValidated) return;
    setIsSubmitting(true);
    const toastId = toast.loading("Creating...");
    const result = await createRide(values);

    if (result.success) {
      toast.success("Ride created", {
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

  const FuelPricePerLitre = 2.5;
  const FuelConsumptionPerKm = 0.1;

  const getPriceByDistance = (distance: number) => {
    return Number(
      (FuelPricePerLitre * (distance / 1000) * FuelConsumptionPerKm).toFixed(2)
    );
  };

  useEffect(() => {
    const { from, to } = form.getValues();
    if (!from || !to || isPriceLoading) return;
    setIsPriceLoading(true);
    getDirections({ from, to }).then((res) => {
      setRealPriceValue(
        res.success ? getPriceByDistance(res.data.distance) : 0
      );
      form.setValue("distance", res.success ? res.data.distance : 0);
      form.setValue("duration", res.success ? res.data.duration : 0);
      setIsPriceValidated(true);

      setIsPriceLoading(false);
    });
  }, [form.watch("from"), form.watch("to")]);

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
                    disabled={isPriceLoading}
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
                    disabled={isPriceLoading}
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

        <FormField
          control={form.control}
          name="carId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Choose your car</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(v) => {
                    setSelectedCar(cars.find((c) => c.id === v) || null);
                    form.resetField("availableSeats");
                    field.onChange(v);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {cars.map(({ id, name }) => (
                        <SelectItem key={id} value={id}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>Please enter the departure time</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="availableSeats"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Choose aailable seats</FormLabel>
              <FormControl>
                <Select
                  key={selectedCar?.id}
                  value={field.value?.toString()}
                  onValueChange={(v) => {
                    field.onChange(Number(v));
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {Array.from(
                        { length: selectedCar?.capacity || 0 },
                        (_, i) => i + 1
                      ).map((o) => (
                        <SelectItem key={o} value={o.toString()}>
                          {o}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>Please enter the departure time</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="departure"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Departure Time</FormLabel>
              <FormControl>
                <DatePicker
                  isHour
                  placeholder={m.last_ornate_lion_dine()}
                  {...field}
                />
              </FormControl>
              <FormDescription>Please enter the departure time</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <NumericFormat
                  disabled={isPriceLoading}
                  key={realPriceValue}
                  decimalScale={2}
                  customInput={Input}
                  value={field.value}
                  onValueChange={(v) => {
                    const { floatValue } = v;
                    console.log(floatValue);
                    if (
                      floatValue === undefined ||
                      !(
                        floatValue <= realPriceValue + PRICE_RANGE &&
                        floatValue >= Math.max(0, realPriceValue - PRICE_RANGE)
                      )
                    ) {
                      setIsPriceValidated(false);
                    } else {
                      setIsPriceValidated(true);
                    }
                    field.onChange(Number(floatValue));
                  }}
                />
              </FormControl>
              <FormDescription>
                Price should be ebtween{" "}
                {Math.max(0, realPriceValue - PRICE_RANGE)} -{" "}
                {realPriceValue + PRICE_RANGE}
              </FormDescription>
              {!isPriceValidated ? (
                <FormMessage>Pls enter in valid range </FormMessage>
              ) : (
                <FormMessage />
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ruleIds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rules</FormLabel>
              <FormControl>
                <ReactSelect
                  // defaultValue={[colourOptions[2], colourOptions[3]]}
                  isMulti
                  name="rules"
                  options={rules.map((r) => ({
                    value: r.id,
                    label: r.description,
                  }))}
                  // make heigjht
                  className="basic-multi-select py-0"
                  classNamePrefix="select"
                  onChange={(v) => {
                    console.log(v);
                    field.onChange(v.map((x) => x.value));
                  }}
                />
              </FormControl>
              {/* <FormDescription>
                Price should be ebtween{" "}
                {Math.max(0, realPriceValue - PRICE_RANGE)} -{" "}
                {realPriceValue + PRICE_RANGE}
              </FormDescription>
              {!isPriceValidated ? (
                <FormMessage>Pls enter in valid range </FormMessage>
              ) : (
                <FormMessage />
              )} */}
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