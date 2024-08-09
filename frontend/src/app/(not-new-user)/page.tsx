"use client";
import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";
import HowItWorks from "@/components/sections/how-it-works";
import Partners from "@/components/sections/partners";

export default function Home() {
  return (
    <>
      <Hero />
      {/* <div className="container">
        <PhoneInput />
      </div> */}
      <Features />
      <HowItWorks />
      {/* <Testimonials /> */}
      <Partners />
    </>
  );
}
