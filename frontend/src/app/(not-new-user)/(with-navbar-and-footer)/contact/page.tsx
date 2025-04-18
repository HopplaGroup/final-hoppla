"use client";

import { useState } from "react";
import {
    MapPin,
    Mail,
    Phone,
    MessageSquare,
    Send,
    Settings,
} from "lucide-react";
import * as m from "@/paraglide/messages.js";
import submitContactForm from "./_actions/submitContactForm";
import { ContactSubmissionType } from "@prisma/client";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        type: ContactSubmissionType.GENERAL,
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<
        null | "success" | "error"
    >(null);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const result = await submitContactForm(formData);

            if (result.success) {
                setSubmitStatus("success");
                setFormData({
                    name: "",
                    email: "",
                    type: ContactSubmissionType.GENERAL,
                    message: "",
                });
            } else {
                setSubmitStatus("error");
            }
        } catch (error) {
            console.error("Form submission error:", error);
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
            // Reset status after 3 seconds
            setTimeout(() => setSubmitStatus(null), 3000);
        }
    };

    const ContactSubmissionTypeToLabel = {
        [ContactSubmissionType.GENERAL]: m.simple_main_weasel_grace(),
        [ContactSubmissionType.FEEDBACK]: m.funny_caring_owl_hope(),
        [ContactSubmissionType.SUPPORT]: m.aware_only_boar_edit(),
    };

    return (
        <div className="min-h-screen bg-gray-50/50">
            <div className="container py-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6">
                                {m.mean_close_goose_urge()}
                            </h2>
                            <p className="text-gray-600 mb-6">
                                {m.quick_even_termite_roam()}
                            </p>

                            <div className="space-y-4">
                                {/* <ContactMethod
                                    icon={MapPin}
                                    title="Visit Us"
                                    detail="123 Transit Avenue, Mobility City, MC 12345"
                                /> */}
                                <ContactMethod
                                    icon={Mail}
                                    title={m.tense_gaudy_kitten_pull()}
                                    detail="hopplage@gmail.com"
                                />
                                {/* <ContactMethod
                                    icon={Phone}
                                    title="Call Us"
                                    detail="+1 (555) 123-4567"
                                /> */}
                                {/* <ContactMethod
                                    icon={MessageSquare}
                                    title="Live Chat"
                                    detail="Available Mon-Fri, 9AM - 6PM"
                                /> */}
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6">
                                {m.silly_dirty_cougar_hack()}
                            </h2>

                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            {m.bland_key_liger_hint()}
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                                            placeholder={m.glad_inner_shrike_read()}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            {m.tiny_safe_alligator_dream()}
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                                            placeholder="your.email@example.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label
                                        htmlFor="type"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        {m.loose_aware_wombat_spin()}
                                    </label>
                                    <select
                                        id="type"
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                                        required
                                    >
                                        <option value="">
                                            {m.sunny_dry_bobcat_empower()}
                                        </option>
                                        {Object.values(
                                            ContactSubmissionType
                                        ).map((type) => (
                                            <option key={type} value={type}>
                                                {
                                                    ContactSubmissionTypeToLabel[
                                                        type
                                                    ]
                                                }
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-6">
                                    <label
                                        htmlFor="message"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        {m.key_fuzzy_ocelot_cheer()}
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={5}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                                        placeholder={m.stale_trick_owl_enjoy()}
                                        required
                                    ></textarea>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors flex items-center space-x-2"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                <span>
                                                    {m.last_ornate_rat_push()}
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4" />
                                                <span>
                                                    {m.plain_giant_sparrow_roar()}
                                                </span>
                                            </>
                                        )}
                                    </button>
                                </div>

                                {/* Status Messages */}
                                {submitStatus === "success" && (
                                    <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg">
                                        {m.direct_merry_horse_sway()}
                                    </div>
                                )}

                                {submitStatus === "error" && (
                                    <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
                                        {m.male_stout_worm_feel()}
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ContactMethod({
    icon: Icon,
    title,
    detail,
}: {
    icon: React.ElementType;
    title: string;
    detail: string;
}) {
    return (
        <div className="flex items-start">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Icon className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <div className="ml-3">
                <h3 className="font-medium text-gray-800">{title}</h3>
                <p className="text-sm text-gray-600">{detail}</p>
            </div>
        </div>
    );
}
