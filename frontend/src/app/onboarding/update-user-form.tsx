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
import { UpdateUserSchema } from "./schema";
import { updateUser } from "./actions";
import { PhoneInput } from "@/components/ui/data-input/phone-input";
import { DatePicker } from "@/components/ui/date-picker";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLoading } from "@/lib/providers/loading-provider";
import { FolderPen } from "lucide-react";
import * as m from "@/paraglide/messages.js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export function UpdateUserForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const form = useForm<z.infer<typeof UpdateUserSchema>>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      name: "",
      sex: "OTHER",
      birthDate: undefined,
      mobileNumber: "",
      bio: "My small bio...",
    },
  });

  async function onSubmit(values: z.infer<typeof UpdateUserSchema>) {
    if (isSubmitting) return;
    setIsSubmitting(true);
    const toastId = toast.loading(m.ideal_long_ant_rest());
    const result = await updateUser(values);
    if (result.success) {
      toast.success(m.this_tidy_mammoth_trust(), {
        id: toastId,
      });
      push("/profile");
    } else {
      toast.error(m.known_every_emu_bless(), {
        id: toastId,
      });
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 text-left mx-auto mb-20"
      >
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
              <FormDescription>{m.polite_safe_vole_stab()}</FormDescription>
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
              <FormDescription>{m.new_neat_porpoise_fetch()}</FormDescription>
              <FormMessage errorMessage={m.teal_top_starfish_pout()} />
            </FormItem>
          )}
        />
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
              <FormDescription>{m.big_weak_stingray_kiss()}</FormDescription>
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
              <FormDescription>
                {m.smart_green_albatross_type()}
              </FormDescription>
              <FormMessage errorMessage={m.actual_royal_mole_bake()} />
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
