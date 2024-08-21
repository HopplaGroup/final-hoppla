import * as m from "@/paraglide/messages.js";
import { Shield, Stars, ThumbsUp } from "lucide-react";

type FeaturesProps = {};

export function Features({}: FeaturesProps) {
  return (
    <>
      <div className="py-10 lg:py-24 mb-20">
        <div className="grid md:grid-cols-5 gap-10 container">
          <div className="lg:w-3/4 md:col-span-3">
            <h2 className="text-3xl text-gray-800 font-semibold lg:text-4xl">
              Features to make better user experience
            </h2>
            <p className="mt-3 text-gray-800">
              Discover the benefits of using our app. We provide a wide range of
              features that will help you to make your life easier.
            </p>
            <p className="mt-5">
              <a
                className="inline-flex items-center gap-x-1 text-sm text-primary decoration-2 hover:underline focus:outline-none focus:underline font-medium"
                href="#"
              >
                Read more about our features
                <svg
                  className="shrink-0 size-4 transition ease-in-out group-hover:translate-x-1 group-focus:translate-x-1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </a>
            </p>
          </div>

          <div className="space-y-6 lg:space-y-10 md:col-span-2">
            <div className="flex gap-x-5 sm:gap-x-8 max-sm:flex-wrap gap-y-2">
              <Stars size={24} className="text-primary size-6" />
              <div className="grow">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                  Easy Booking
                </h3>
                <p className="mt-1 text-gray-600">
                  Booking your next trip is super easy with our app. Just search
                  for nearby rides.
                </p>
              </div>
            </div>

            <div className="flex gap-x-5 sm:gap-x-8 max-sm:flex-wrap gap-y-2">
              <Shield size={22} className="text-primary size-6" />
              <div className="grow">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                  Safe Travels
                </h3>
                <p className="mt-1 text-gray-600">
                  We ensure safety by vetting users and partners.
                </p>
              </div>
            </div>

            <div className="flex gap-x-5 sm:gap-x-8 max-sm:flex-wrap gap-y-2">
              <ThumbsUp size={22} className="text-primary size-6" />
              <div className="grow">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                  Affordable Adventures
                </h3>
                <p className="mt-1 text-gray-600">
                  Discover great places to visit without spending too much
                  money!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
