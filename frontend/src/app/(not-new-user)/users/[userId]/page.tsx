"use client";
import { Logo } from "@/components/common/logo";
import { useFindManyUserReview, useFindUniqueUser } from "@/lib/hooks";
import {
  Bookmark,
  Calendar,
  ChevronDown,
  ChevronLeft,
  Image,
  LoaderCircle,
  Mail,
  MessageCircle,
  Phone,
  Plus,
  Stars,
  Text,
  User,
} from "lucide-react";
import AddReview from "./add-review";
import { useUser } from "@/lib/providers/user-provider";

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
  const { user: loggedUser } = useUser();
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

  return (
    <div className="grid grid-cols-[400px,1fr]">
      <div className="h-screen bg-gray-100 p-10 grid grid-rows-[auto,1fr]">
        <div>
          <div className="mx-2 pb-4">
            <Logo />
          </div>
          <div className="flex items-center gap-2 font-semibold">
            <ChevronLeft size={30} /> <span>Go Back</span>
          </div>
          <AddReview revieweeId={userId} />
        </div>

        {isUserReviewsLoading ? (
          <UserReviewsSkeleton />
        ) : (
          userReviews && (
            <div className="overflow-auto space-y-4 mt-4">
              {userReviews.map((review) => (
                <div key={review.id} className=" bg-white shadow-sm rounded-lg">
                  <div>
                    <div className="p-5">
                      {review.$optimistic && (
                        <LoaderCircle className="animate-spin mb-3" />
                      )}

                      <div className="bg-gray-100 rounded-lg p-3">
                        {`"${review.comment}"`}
                      </div>
                    </div>
                    <div className="flex justify-between border-t border-t-gray-200 p-5">
                      <div>
                        <h3 className="font-medium">
                          {review.$optimistic
                            ? loggedUser?.name
                            : review.author.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{review.rating}</span>{" "}
                          <Stars className="text-primary" size={18} />
                        </div>
                      </div>
                      <div>
                        <img
                          src={
                            review.$optimistic
                              ? loggedUser?.profileImg
                              : review.author.profileImg
                          }
                          className="size-10 rounded-md object-cover"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
      <div className="py-10 pl-20 pr-10 h-screen overflow-auto">
        {isUserLoading ? (
          <UserProfileSkeleton />
        ) : user ? (
          <>
            <h3 className="mt-5 font-semibold">User Profile</h3>
            <h2 className="mt-2 font-bold text-3xl">{user.name}</h2>
            <div className="flex items-center gap-5">
              <h4 className=" flex items-center gap-2 mt-4">
                <Bookmark size={22} /> <span>Save to Bookmarks</span>
              </h4>
              <h4 className=" flex items-center gap-2 mt-4">
                <MessageCircle size={22} /> <span>Add to Contact</span>
              </h4>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-md mt-5">
              <ChevronDown size={22} />
              <span className="font-semibold">Details about user</span>
            </div>
            <div className="max-w-md mt-5">
              <dl className="-my-3 divide-y divide-gray-100 text-sm">
                <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900 flex items-center gap-2">
                    <Phone size={22} />
                    Phone
                  </dt>
                  <dd className="text-gray-700 sm:col-span-2">
                    {user.mobileNumber}
                  </dd>
                </div>

                <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900 flex items-center gap-2">
                    <Mail size={22} />
                    E-Mail
                  </dt>
                  <dd className="text-gray-700 sm:col-span-2">{user.email}</dd>
                </div>

                <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900  flex items-center gap-2">
                    <User size={22} /> Sex
                  </dt>
                  <dd className="text-gray-700 sm:col-span-2">{user.sex}</dd>
                </div>

                {/* rating, bio, birthDate */}
                <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900  flex items-center gap-2">
                    <Calendar size={22} /> Age
                  </dt>
                  <dd className="text-gray-700 sm:col-span-2">
                    {new Date().getFullYear() -
                      new Date(user.birthDate).getFullYear()}{" "}
                    years old
                  </dd>
                </div>
                <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900  flex items-center gap-2">
                    <Stars size={22} /> Rating
                  </dt>
                  <dd className="text-gray-700 sm:col-span-2">{user.rating}</dd>
                </div>
                <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900  flex items-start gap-2">
                    <Text size={22} /> Bio
                  </dt>
                  <dd className="text-gray-700 sm:col-span-2">{user.bio}</dd>
                </div>
                <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900 flex items-start gap-2">
                    <Image size={22} /> Photo
                  </dt>
                  <dd className="text-gray-700 sm:col-span-2">
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-lg px-2 py-2 font-semibold">
                      <img
                        // src="https://yt3.googleusercontent.com/-0Rgm4PydVPspcst43ybfo4us_zM6_4ZCdrmI5LB4Dxq6MJNg9oZ2u7mq7YDwmc8WIrVU-m0xTQ=s900-c-k-c0x00ffffff-no-rj"
                        src={user.profileImg}
                        className="size-40 rounded-lg object-cover"
                        alt=""
                      />
                    </div>
                  </dd>
                </div>
              </dl>
            </div>
          </>
        ) : (
          <div className="text-xl font-semibold">User Not Found</div>
        )}
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
          <div className="p-5">
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
