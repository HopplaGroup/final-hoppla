// import { Hero } from "@/components/sections/hero";
import Image from "next/image";
import highWay from "../../../../public/assets/road-svg.svg";
import SearchBarLanding from "./serch-bar-landing";
import HowItWorks from "@/components/sections/how-it-works";
import { Features } from "@/components/sections/features";
import { Testimonials } from "@/components/sections/testimonials";
import Partners from "@/components/sections/partners";
import * as m from "@/paraglide/messages.js";
import UpcomingRidesLanding from "@/components/sections/upcoming-rides-landing";
import { Hero } from "./Hero";

export default function Home() {
  return (
    <>
      <Hero backgroundImage={highWay} />

      {/* <Features /> */}
      <UpcomingRidesLanding />
      <HowItWorks />
      {/* here is available rides */}
      <Testimonials />
      <Partners />
      <div className="mb-20"></div>
    </>
  );
}
