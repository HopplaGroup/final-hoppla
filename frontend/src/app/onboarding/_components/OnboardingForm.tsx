"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import * as m from "@/paraglide/messages";
import { zodPhoneSchema } from "@/lib/utils/phone-schema";
import { updateUser } from "../_actions/actions";
import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/lib/i18n";

// Form schema
const OnboardingSchema = z.object({
    name: z.string().min(1).max(50),
    mobileNumber: zodPhoneSchema,
    birthDate: z.date(),
    sex: z.enum(["MAN", "WOMAN", "OTHER"]),
    bio: z.string().min(1).max(500),
});

type FormValues = z.infer<typeof OnboardingSchema>;

export default function OnboardingForm() {
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);
    const [isRedirecting, setIsRedirecting] = useState(false);
    const [step, setStep] = useState(1);
    const totalSteps = 3;

    const sexOptions = [
        { value: "MAN", label: m.tough_active_grebe_bend() },
        { value: "WOMAN", label: m.east_smart_rat_reap() },
        { value: "OTHER", label: m.clear_any_kitten_favor() },
    ];

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        trigger,
    } = useForm<FormValues>({
        resolver: zodResolver(OnboardingSchema),
        defaultValues: {
            name: "",
            sex: "MAN",
            birthDate: undefined,
            mobileNumber: "+995",
            bio: m.polite_lofty_liger_surge(),
        },
        mode: "onChange",
    });

    const selectedSex = watch("sex");
    const selectedDate = watch("birthDate");
    const selectedMobileNumber = watch("mobileNumber");
    const selectedBio = watch("bio");
    const watchedFields = watch();

    async function onSubmit(values: FormValues) {
        if (step !== totalSteps) return;
        setIsPending(true);
        try {
            const result = await updateUser(values);

            if (result.success) {
                // toast.success("Profile updated successfully!");
                setIsRedirecting(true);
                setTimeout(() => {
                    router.push("/profile");
                }, 800);
            } else {
                toast.error(m.known_every_emu_bless());
                setIsPending(false);
            }
        } catch (error) {
            toast.error(m.known_every_emu_bless());
            console.error("Error updating user:", error);
            setIsPending(false);
        }
    }

    const handleDateChange = (date: Date | null) => {
        if (date) {
            setValue("birthDate", date, { shouldValidate: true });
        }
    };

    const nextStep = async () => {
        let fieldsToValidate: (
            | "name"
            | "mobileNumber"
            | "birthDate"
            | "sex"
            | "bio"
        )[] = [];
        if (step === 1) {
            fieldsToValidate = ["name", "mobileNumber"];
        } else if (step === 2) {
            fieldsToValidate = ["birthDate", "sex"];
        } else if (step === 3) {
            fieldsToValidate = ["bio"];
        }

        const isStepValid = await trigger(fieldsToValidate);
        if (isStepValid) {
            setStep(step + 1);
        }
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const progressPercentage = (step / totalSteps) * 100;

    return (
        <section className="bg-white">
            <div className="lg:grid lg:h-screen lg:grid-cols-12">
                <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6 overflow-hidden">
                    <Image
                        src={"/assets/carpool-registration.svg"}
                        fill
                        alt="Carpool registration"
                        className="absolute inset-0 h-full w-full object-cover lg:object-right-top lg:scale-125 overflow-hidden"
                        priority
                    />
                </aside>

                <main className="overflow-auto lg:h-screen flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
                    <div className="max-w-xl lg:max-w-3xl">
                        <a className="block text-primary" href="#">
                            <span className="sr-only">
                                {m.novel_male_ox_jump()}
                            </span>
                        </a>

                        <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                            {m.mellow_orange_fireant_dust()} 🚗
                        </h1>

                        <p className="mt-4 leading-relaxed text-gray-500">
                            {m.flaky_mealy_wombat_walk()}
                        </p>

                        <div className="mt-6"></div>
                        <div className="relative">
                            {/* Loading Overlay */}
                            {(isPending || isRedirecting) && (
                                <motion.div
                                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="bg-white p-6 rounded-xl shadow-xl flex flex-col items-center">
                                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
                                        <p className="text-gray-800 text-lg font-medium">
                                            {isRedirecting
                                                ? m.loved_careful_bulldog_startle()
                                                : m.bland_noble_beetle_animate()}
                                        </p>
                                    </div>
                                </motion.div>
                            )}

                            {/* Progress Bar */}
                            <div className="mb-6">
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm font-medium text-primary">
                                        {m.tasty_patchy_wren_breathe()} {step}{" "}
                                        {m.true_extra_jurgen_amuse()}{" "}
                                        {totalSteps}
                                    </span>
                                    <span className="text-sm font-medium text-gray-500">
                                        {Math.round(progressPercentage)}%{" "}
                                        {m.each_tired_warbler_prosper()}
                                    </span>
                                </div>
                                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-primary rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{
                                            width: `${progressPercentage}%`,
                                        }}
                                        transition={{ duration: 0.5 }}
                                    ></motion.div>
                                </div>
                            </div>

                            <form className="space-y-6 text-left mx-auto">
                                {step === 1 && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-4"
                                    >
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                            {m.north_such_horse_flop()}
                                        </h3>

                                        {/* Name Field */}
                                        <div className="relative">
                                            <label
                                                htmlFor="name"
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                            >
                                                {m.sour_pretty_tortoise_devour()}
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                    <svg
                                                        className="w-4 h-4 text-gray-500"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                        />
                                                    </svg>
                                                </div>
                                                <input
                                                    id="name"
                                                    type="text"
                                                    className={`w-full outline-none rounded-lg border ${
                                                        errors.name
                                                            ? "border-red-500 focus:ring-red-500"
                                                            : "border-gray-300 focus:ring-primary"
                                                    } pl-10 pr-4 py-3 text-sm shadow-sm focus:border-primary focus:ring-1`}
                                                    placeholder={m.soft_mean_mayfly_clap()}
                                                    {...register("name")}
                                                />
                                            </div>
                                            {errors.name && (
                                                <motion.p
                                                    initial={{
                                                        opacity: 0,
                                                        y: -10,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                    }}
                                                    className="mt-1 text-sm text-red-500"
                                                >
                                                    {m.clear_just_donkey_prosper()}
                                                </motion.p>
                                            )}
                                        </div>

                                        {/* Mobile Number Field */}
                                        <div className="relative">
                                            <label
                                                htmlFor="mobileNumber"
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                            >
                                                {m.flaky_full_guppy_lend()}
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                    <svg
                                                        className="w-4 h-4 text-gray-500"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                                        />
                                                    </svg>
                                                </div>
                                                <input
                                                    id="mobileNumber"
                                                    type="tel"
                                                    className={`w-full outline-none rounded-lg border ${
                                                        errors.mobileNumber
                                                            ? "border-red-500 focus:ring-red-500"
                                                            : "border-gray-300 focus:ring-primary"
                                                    } pl-10 pr-4 py-3 text-sm shadow-sm focus:border-primary focus:ring-1`}
                                                    {...register(
                                                        "mobileNumber"
                                                    )}
                                                />
                                            </div>
                                            {errors.mobileNumber && (
                                                <motion.p
                                                    initial={{
                                                        opacity: 0,
                                                        y: -10,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                    }}
                                                    className="mt-1 text-sm text-red-500"
                                                >
                                                    {m.teal_top_starfish_pout()}
                                                </motion.p>
                                            )}
                                        </div>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-4"
                                    >
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                            {m.sleek_brave_tortoise_link()}
                                        </h3>

                                        {/* Birth Date Field */}
                                        <div className="relative">
                                            <label
                                                htmlFor="birthDate"
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                            >
                                                {m.clean_aqua_squid_catch()}
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                    <svg
                                                        className="w-4 h-4 text-gray-500"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                        />
                                                    </svg>
                                                </div>
                                                <input
                                                    id="birthDate"
                                                    type="date"
                                                    // from and to like age should be at least 5 years
                                                    max={
                                                        new Date(
                                                            new Date().setFullYear(
                                                                new Date().getFullYear() -
                                                                    5
                                                            )
                                                        )
                                                            .toISOString()
                                                            .split("T")[0]
                                                    }
                                                    className={`w-full outline-none rounded-lg border ${
                                                        errors.birthDate
                                                            ? "border-red-500 focus:ring-red-500"
                                                            : "border-gray-300 focus:ring-primary"
                                                    } pl-10 pr-4 py-3 text-sm shadow-sm focus:border-primary focus:ring-1`}
                                                    onChange={(e) => {
                                                        if (e.target.value) {
                                                            handleDateChange(
                                                                new Date(
                                                                    e.target.value
                                                                )
                                                            );
                                                        }
                                                    }}
                                                />
                                            </div>
                                            {errors.birthDate && (
                                                <motion.p
                                                    initial={{
                                                        opacity: 0,
                                                        y: -10,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                    }}
                                                    className="mt-1 text-sm text-red-500"
                                                >
                                                    {m.acidic_sweet_guppy_blend()}
                                                </motion.p>
                                            )}
                                        </div>

                                        {/* Sex Field */}
                                        <div className="relative">
                                            <label
                                                htmlFor="sex"
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                            >
                                                {m.novel_gross_donkey_race()}
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                    <svg
                                                        className="w-4 h-4 text-gray-500"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                        />
                                                    </svg>
                                                </div>
                                                <select
                                                    id="sex"
                                                    className={`w-full rounded-lg border ${
                                                        errors.sex
                                                            ? "border-red-500 focus:ring-red-500"
                                                            : "border-gray-300 focus:ring-primary"
                                                    } pl-10 pr-4 py-3 text-sm shadow-sm focus:border-primary focus:ring-1 appearance-none bg-none`}
                                                    {...register("sex")}
                                                >
                                                    {sexOptions.map(
                                                        (option) => (
                                                            <option
                                                                key={
                                                                    option.value
                                                                }
                                                                value={
                                                                    option.value
                                                                }
                                                            >
                                                                {option.label}
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                    <svg
                                                        className="w-4 h-4 text-gray-500"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M19 9l-7 7-7-7"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                            {errors.sex && (
                                                <motion.p
                                                    initial={{
                                                        opacity: 0,
                                                        y: -10,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                    }}
                                                    className="mt-1 text-sm text-red-500"
                                                >
                                                    {m.actual_royal_mole_bake()}
                                                </motion.p>
                                            )}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 3: Bio and Final */}
                                {step === 3 && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-4"
                                    >
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                            {m.curly_extra_platypus_lift()}
                                        </h3>

                                        {/* Bio Field */}
                                        <div className="relative">
                                            <label
                                                htmlFor="bio"
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                            >
                                                {m.weak_small_lamb_ascend()}
                                            </label>
                                            <div className="relative">
                                                <textarea
                                                    id="bio"
                                                    className={`w-full rounded-lg border ${
                                                        errors.bio
                                                            ? "border-red-500 focus:ring-red-500"
                                                            : "border-gray-300 focus:ring-primary"
                                                    } px-4 py-3 text-sm shadow-sm focus:border-primary focus:ring-1`}
                                                    rows={4}
                                                    {...register("bio")}
                                                ></textarea>
                                            </div>
                                            {errors.bio && (
                                                <motion.p
                                                    initial={{
                                                        opacity: 0,
                                                        y: -10,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                    }}
                                                    className="mt-1 text-sm text-red-500"
                                                >
                                                    Bio is required
                                                </motion.p>
                                            )}
                                        </div>

                                        <p className="text-sm text-primary font-medium">
                                            {m.whole_fresh_macaw_cure()}
                                        </p>

                                        <div className="text-sm text-gray-600 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                            <p>
                                                {m.aware_tense_dolphin_grow()}{" "}
                                                <Link
                                                    target="_blank"
                                                    href="/terms"
                                                    className="text-primary font-medium hover:underline"
                                                >
                                                    {m.bald_knotty_nils_fond()}{" "}
                                                </Link>
                                                {m.male_bold_robin_spur()}
                                                <Link
                                                    target="_blank"
                                                    href="/privacy"
                                                    className="text-primary font-medium hover:underline"
                                                >
                                                    {" "}
                                                    {m.careful_gaudy_cobra_clap()}
                                                </Link>
                                                .
                                            </p>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Navigation Buttons */}
                                <div className="flex items-center justify-between pt-4">
                                    {step > 1 ? (
                                        <button
                                            type="button"
                                            onClick={prevStep}
                                            disabled={
                                                isPending || isRedirecting
                                            }
                                            className="flex items-center justify-center rounded-lg bg-gray-100 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-200 disabled:opacity-50 transition-colors"
                                        >
                                            <svg
                                                className="w-4 h-4 mr-2"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M15 19l-7-7 7-7"
                                                />
                                            </svg>
                                            {m.spare_fit_marten_loop()}
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            disabled={
                                                isPending || isRedirecting
                                            }
                                            className="inline-block rounded-lg bg-transparent px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 transition-colors"
                                        >
                                            <LogoutLink className="w-full h-full flex items-center justify-center">
                                                <svg
                                                    className="w-4 h-4 mr-2"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                                    />
                                                </svg>
                                                {m.extra_lucky_rook_trust()}
                                            </LogoutLink>
                                        </button>
                                    )}

                                    {step < totalSteps ? (
                                        <button
                                            type="button"
                                            onClick={nextStep}
                                            disabled={
                                                isPending || isRedirecting
                                            }
                                            className="inline-flex items-center rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white disabled:opacity-50 transition-colors hover:bg-primary/70"
                                        >
                                            {m.giant_fluffy_firefox_prosper()}
                                            <svg
                                                className="w-4 h-4 ml-2"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M9 5l7 7-7 7"
                                                />
                                            </svg>
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={handleSubmit(onSubmit)}
                                            disabled={
                                                isPending || isRedirecting
                                            }
                                            className="inline-flex items-center rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white disabled:opacity-50 transition-colors hover:bg-primary/70"
                                        >
                                            {m.kind_gaudy_puma_exhale()}
                                            <svg
                                                className="w-4 h-4 ml-2"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </section>
    );
}
