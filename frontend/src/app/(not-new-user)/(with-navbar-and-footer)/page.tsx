import { Hero } from "@/components/sections/hero";
import Image from "next/image";
import highWay from "../../../../public/assets/road-svg.svg";
import SearchBarLanding from "./serch-bar-landing";
import HowItWorks from "@/components/sections/how-it-works";
import { Features } from "@/components/sections/features";
import { Testimonials } from "@/components/sections/testimonials";
import Partners from "@/components/sections/partners";

export default function Home() {
    return (
        <>
            <div className="relative h-200px w-full">
                <div className="relative h-80 w-full overflow-hidden">
                    <Image
                        className="object-cover object-center h-full w-full"
                        src={highWay}
                        alt="Picture of the author"
                    />
                </div>
                <div className="absolute left-0 top-0 w-full h-full bg-[#ff5733] bg-opacity-20 flex flex-col p-4">
                    <div className="mt-10 mb-20">
                        <p className="text-white stroke-red-500 text-center text-5xl font-bold">
                            Where are you headed to?
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <SearchBarLanding />
                    </div>
                </div>
            </div>
            <Features />
            <HowItWorks />
            <Testimonials />
            <Partners />
            <div className="mb-20"></div>
        </>
    );
}
