"use client";
import { Logo } from "@/components/common/logo";
import {
    useFindManyUser,
    useFindManyUserReview,
    useFindUniqueUser,
} from "@/lib/hooks";
import { Calendar, Image, Mail, Phone, Stars, Text, User } from "lucide-react";
import { useMemo } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import ContentWithReviews from "./content-with-reviews";

type UserPageProps = {
    params: { userId: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export default function UserPage({ params, searchParams }: UserPageProps) {
    const { userId } = params;
    const { data: user, isLoading: isUserLoading } = useFindUniqueUser({
        where: {
            id: userId,
        },
    });
    const { data: userReviews, isLoading: isUserReviewsLoading } =
        useFindManyUserReview({
            where: {
                revieweeId: userId,
            },
            include: {
                author: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

    const averageUserRating = useMemo(() => {
        if (!userReviews || userReviews.length === 0) return 0;

        const totalRating = userReviews.reduce(
            (sum, review) => sum + review.rating,
            0
        );
        return totalRating / userReviews.length;
    }, [userReviews]);

    return (
        <ContentWithReviews userId={userId}>
            {isUserLoading ? (
                <UserProfileSkeleton />
            ) : user ? (
                <>
                    <h3 className="mt-5 font-semibold">User Profile</h3>
                    <h2 className="mt-2 font-bold text-2xl lg:text-3xl">
                        {user.name}
                    </h2>
                    <Accordion
                        defaultValue="user"
                        className="mt-4"
                        type="single"
                        collapsible
                    >
                        <AccordionItem value="user">
                            {/* add acordion to another page as well */}
                            {/* no one can read and book as well if not driver itself or admin */}
                            {/* no one can book if driver is not verified as driver */}
                            {/* no one can read if driver is not verified as driver and also car is not verified for driver */}
                            {/* hmm maybe ride also has status for verification, and automatically verified but can be updates aas rejected because of some case */}
                            {/* ask gpt what is the best use case to do here how to handle bussiness logic hmm */}
                            <AccordionTrigger className="bg-white p-4 rounded-md">
                                <span className="font-semibold">
                                    Details about user
                                </span>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="w-full max-w-md mt-5">
                                    <dl className="-my-3 divide-y divide-gray-100 text-sm">
                                        {/* User details */}
                                        {[
                                            {
                                                icon: <Phone size={20} />,
                                                label: "Phone",
                                                value: user.mobileNumber,
                                            },
                                            {
                                                icon: <Mail size={20} />,
                                                label: "E-Mail",
                                                value: user.email,
                                            },
                                            {
                                                icon: <User size={20} />,
                                                label: "Sex",
                                                value: user.sex,
                                            },
                                            {
                                                icon: <Calendar size={20} />,
                                                label: "Age",
                                                value: `${
                                                    new Date().getFullYear() -
                                                    new Date(
                                                        user.birthDate
                                                    ).getFullYear()
                                                } years old`,
                                            },
                                            {
                                                icon: <Stars size={20} />,
                                                label: "Rating",
                                                value: averageUserRating.toFixed(
                                                    1
                                                ),
                                            },
                                            {
                                                icon: <Text size={20} />,
                                                label: "Bio",
                                                value: user.bio,
                                            },
                                        ].map((item, index) => (
                                            <div
                                                key={index}
                                                className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
                                            >
                                                <dt className="font-medium text-gray-900 flex items-center gap-2">
                                                    {item.icon}
                                                    {item.label}
                                                </dt>
                                                <dd className="text-gray-700 sm:col-span-2">
                                                    {item.value}
                                                </dd>
                                            </div>
                                        ))}
                                        <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                            <dt className="font-medium text-gray-900 flex items-start gap-2">
                                                <Image size={20} /> Photo
                                            </dt>
                                            <dd className="text-gray-700 sm:col-span-2">
                                                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-lg px-2 py-2 font-semibold">
                                                    <img
                                                        src={user.profileImg}
                                                        className="w-32 h-32 lg:w-40 lg:h-40 rounded-lg object-cover"
                                                        alt=""
                                                    />
                                                </div>
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </>
            ) : (
                <div className="text-xl font-semibold">User Not Found</div>
            )}
        </ContentWithReviews>
    );
}

const UserProfileSkeleton = () => (
    <div className="animate-pulse">
        <div className="h-8 w-32 bg-gray-200 rounded mb-4"></div>
        <div className="h-10 w-64 bg-gray-200 rounded mb-4"></div>
        <div className="flex gap-4 mb-6">
            <div className="h-6 w-40 bg-gray-200 rounded"></div>
            <div className="h-6 w-40 bg-gray-200 rounded"></div>
        </div>
        <div className="h-10 w-full bg-gray-200 rounded mb-6"></div>
        {[...Array(7)].map((_, index) => (
            <div key={index} className="flex gap-4 mb-4">
                <div className="h-6 w-1/4 bg-gray-200 rounded"></div>
                <div className="h-6 w-2/3 bg-gray-200 rounded"></div>
            </div>
        ))}
    </div>
);
