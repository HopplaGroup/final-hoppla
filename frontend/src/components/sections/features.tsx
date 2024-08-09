import * as m from "@/paraglide/messages.js";

type FeaturesProps = {};

export function Features({}: FeaturesProps) {
  return (
    <>
      <div className="container mt-32">
        <div className="max-w-2xl mx-auto text-center ">
          <h2 className="text-4xl text-foreground font-semibold mx-auto">
            {m.tidy_heavy_trout_harbor()}
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-base leading-relaxed">
            {m.steep_north_mongoose_feel()}
          </p>
        </div>
        <nav
          className="max-w-6xl mx-auto grid sm:flex gap-y-px sm:gap-y-0 sm:gap-x-4  mt-12 "
          aria-label="Tabs"
          role="tablist"
        >
          <div
            className=" duration-200 hs-tab-active:hover:border-transparent w-full flex flex-col text-start  p-3 md:p-5 rounded-xl active"
            id="tabs-with-card-item-1"
            data-hs-tab="#tabs-with-card-1"
            aria-controls="tabs-with-card-1"
            role="tab"
          >
            <svg
              className="flex-shrink-0 mx-auto size-7 hs-tab-active:text-blue-600 text-primary"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
              <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
              <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" />
              <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
              <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
            </svg>
            <span className="mt-5 text-center ">
              <span className="hs-tab-active:text-blue-600 duration-200 block font-semibold ">
                {m.lost_loved_larva_conquer()}
              </span>
              <span className=" mt-2 ">{m.least_born_butterfly_commend()}</span>
            </span>
          </div>

          <div
            className=" duration-200 hs-tab-active:hover:border-transparent w-full flex flex-col text-start  p-3 md:p-5 rounded-xl"
            id="tabs-with-card-item-2"
            data-hs-tab="#tabs-with-card-2"
            aria-controls="tabs-with-card-2"
            role="tab"
          >
            <svg
              className="flex-shrink-0 mx-auto size-7 hs-tab-active:text-blue-600 text-primary"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m12 14 4-4" />
              <path d="M3.34 19a10 10 0 1 1 17.32 0" />
            </svg>
            <span className="mt-5 text-center">
              <span className="hs-tab-active:text-blue-600 duration-200 block font-semibold ">
                {m.teal_wild_cheetah_heart()}
              </span>
              <span className=" mt-2 ">{m.hour_wide_puma_file()}</span>
            </span>
          </div>

          <div
            className=" duration-200 hs-tab-active:hover:border-transparent w-full flex flex-col text-start  p-3 md:p-5 rounded-xl"
            id="tabs-with-card-item-3"
            data-hs-tab="#tabs-with-card-3"
            aria-controls="tabs-with-card-3"
            role="tab"
          >
            <svg
              className="flex-shrink-0 mx-auto size-7 hs-tab-active:text-blue-600 text-primary"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
              <path d="M5 3v4" />
              <path d="M19 17v4" />
              <path d="M3 5h4" />
              <path d="M17 19h4" />
            </svg>
            <span className="mt-5 text-center">
              <span className="hs-tab-active:text-blue-600 duration-200 block font-semibold ">
                {m.jolly_safe_sawfish_play()}
              </span>
              <span className=" mt-2 ">{m.mushy_soft_thrush_peel()}</span>
            </span>
          </div>
        </nav>
      </div>
    </>
  );
}
