import { Hero } from "@/components/sections/hero";
import Image from "next/image";
import highWay from "../../../../public/assets/road-svg.svg";
import SearchBarLanding from "./serch-bar-landing";
import HowItWorks from "@/components/sections/how-it-works";
import { Features } from "@/components/sections/features";
import { Testimonials } from "@/components/sections/testimonials";
import Partners from "@/components/sections/partners";
import * as m from "@/paraglide/messages.js";
import UpcomingRidesLanding from "@/components/sections/upcoming-rides-landing";

export default function Home() {
  return (
    <>
      <div className="relative w-full min-h-80">
        <div className="absolute left-0 top-0 h-full min-h-80 w-full overflow-hidden">
          <Image
            className="object-cover object-center h-full w-full"
            src={highWay}
            alt="Picture of the author"
          />
        </div>
        <div className="bg-[#ff5733] h-full min-h-80 bg-opacity-20 p-4 relative">
          <div className="mt-10 mb-20">
            <p className="text-white stroke-red-500 text-center text-5xl font-bold">
              {m.ago_clean_fireant_zoom()}
            </p>
          </div>
          <div className="flex justify-center">
            <SearchBarLanding />
          </div>
        </div>
      </div>
      <Features />
      <UpcomingRidesLanding />
      <HowItWorks />
      {/* here is available rides */}
      <Testimonials />
      <Partners />
      <div className="mb-20"></div>
    </>
  );
}
