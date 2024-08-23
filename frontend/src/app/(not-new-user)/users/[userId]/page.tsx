"use client";
import { Logo } from "@/components/common/logo";
import { useFindManyUserReview, useFindUniqueUser } from "@/lib/hooks";
import {
  Bookmark,
  Calendar,
  ChevronDown,
  ChevronLeft,
  Image,
  Mail,
  MessageCircle,
  Phone,
  Stars,
  Text,
  User,
} from "lucide-react";
import AddReview from "./add-review";
import ReviewCard from "./review-card";
import { useMemo } from "react";
import GoBackButton from "./go-back-button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

  const reviews = isUserReviewsLoading ? (
    <UserReviewsSkeleton />
  ) : (
    userReviews && (
      <div className="space-y-4 mt-4">
        {userReviews.map((review) => (
          <ReviewCard review={review} key={review.id} />
        ))}
      </div>
    )
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[400px,1fr]">
      <div className="bg-gray-100 p-4 lg:p-10 lg:h-screen lg:grid lg:grid-rows-[auto,1fr]">
        <div className="hidden lg:block">
          <div className="mx-2 pb-4">
            <Logo />
          </div>
          <GoBackButton />
          {user && <AddReview revieweeId={userId} />}
        </div>

        <div className="flex items-center justify-between lg:hidden">
          <GoBackButton />
          <div className="mx-2 pb-4">
            <Logo />
          </div>
        </div>
        <div className="hidden lg:block h-full overflow-auto">{reviews}</div>
      </div>
      <div className="py-2 px-6 lg:py-10 lg:pl-20 lg:pr-10 lg:h-screen lg:overflow-auto">
        {isUserLoading ? (
          <UserProfileSkeleton />
        ) : user ? (
          <>
            <h3 className="mt-5 font-semibold">User Profile</h3>
            <h2 className="mt-2 font-bold text-2xl lg:text-3xl">{user.name}</h2>
            {/* <div className="flex flex-wrap items-center gap-5">
              <h4 className="flex items-center gap-2 mt-4">
                <Bookmark size={20} /> <span>Save to Bookmarks</span>
              </h4>
              <h4 className="flex items-center gap-2 mt-4">
                <MessageCircle size={20} /> <span>Add to Contact</span>
              </h4>
            </div> */}
            <Accordion
              defaultValue="user"
              className="mt-4"
              type="single"
              collapsible
            >
              <AccordionItem value="user">
                <AccordionTrigger className="bg-gray-100 p-4 rounded-md">
                  <span className="font-semibold">Details about user</span>
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
                            new Date(user.birthDate).getFullYear()
                          } years old`,
                        },
                        {
                          icon: <Stars size={20} />,
                          label: "Rating",
                          value: averageUserRating.toFixed(1),
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
      </div>
      <div className="block lg:hidden bg-gray-100 px-5">
        {user && <AddReview revieweeId={userId} />}
        {reviews}
      </div>
    </div>
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

const UserReviewsSkeleton = () => (
  <div className="animate-pulse">
    {[...Array(1)].map((_, index) => (
      <div key={index} className="mt-4 bg-white shadow-sm rounded-lg">
        <div>
          <div className="p-4">
            <div className="bg-gray-100 rounded-lg p-3"></div>
          </div>
          <div className="flex justify-between border-t border-t-gray-200 p-5">
            <div>
              <h3 className="font-medium">
                <div className="h-6 w-32 bg-gray-200 rounded"></div>
              </h3>
              <div className="flex items-center gap-2 mt-2">
                <span className="font-semibold">
                  <div className="h-6 w-12 bg-gray-200 rounded"></div>
                </span>{" "}
                <Stars className="text-primary" size={18} />
              </div>
            </div>
            <div>
              <div className="size-10 rounded-md object-cover bg-gray-200"></div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);
