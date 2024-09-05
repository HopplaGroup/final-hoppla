import Image from "next/image";
import * as m from "@/paraglide/messages.js";

type HowItWorksProps = {};

export default function HowItWorks({}: HowItWorksProps) {
    return (
        <section className="relative mt-32 container">
            <div>
                <div className="max-w-2xl mx-auto text-center ">
                    <h2 className="text-4xl font-extrabold text-gray-800">
                        {m.such_fun_weasel_seek()}
                    </h2>

                    <p className="text-sm mt-4 leading-relaxed text-gray-800">
                        {m.glad_sad_quail_bless()}
                    </p>
                </div>

                <div className="relative mt-12 lg:mt-20">
                    <div className="absolute  inset-x-0 hidden xl:px-44 top-2 md:block md:px-20 lg:px-28">
                        <Image
                            alt=""
                            loading="lazy"
                            width="1000"
                            height="500"
                            decoding="async"
                            data-nimg="1"
                            className="w-full z-50"
                            // style="color:transparent"
                            src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg"
                        />
                    </div>
                    <div className="relative grid grid-cols-1 text-center gap-y-12 md:grid-cols-3 gap-x-12 ">
                        <div className="">
                            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-primary text-primary-foreground rounded-full">
                                <span className="font-semibold">1</span>
                            </div>
                            <h3 className="mt-6 font-semibold leading-tight md:mt-10">
                                {m.inclusive_patchy_tuna_mend()}
                            </h3>
                            <p className="mt-2 text-base ">
                                {m.lime_keen_swan_hope()}
                            </p>
                        </div>
                        <div>
                            <div className="flex items-center justify-center w-12 h-12 mx-auto text-primary-foreground bg-primary rounded-full">
                                <span className="font-semibold">2</span>
                            </div>
                            <h3 className="mt-6 text font-semibold leading-tight md:mt-10">
                                {m.that_same_stingray_leap()}
                                {/* {m.fuzzy_mad_mallard_hunt()} */}
                            </h3>
                            <p className="mt-2 text-base ">
                                {m.tame_still_horse_enchant()}
                            </p>
                        </div>
                        <div>
                            <div className="flex items-center justify-center w-12 h-12 mx-auto text-primary-foreground bg-primary rounded-full">
                                <span className="font-semibold">3</span>
                            </div>
                            <h3 className="mt-6 font-semibold leading-tight md:mt-10">
                                {m.mellow_knotty_sheep_jolt()}
                            </h3>
                            <p className="mt-2 text-base ">
                                {m.fuzzy_mad_mallard_hunt()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute inset-0 m-auto max-w-xs h-[357px] blur-[118px] sm:max-w-md md:max-w-lg"></div>
        </section>
    );
}
