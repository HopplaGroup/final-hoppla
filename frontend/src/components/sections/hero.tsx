import { Button } from "../ui/actions/button";
import * as m from "@/paraglide/messages.js";

export function Hero() {
  return (
    <div className="container relative isolate mt-20">
      <div className="mx-auto ">
        <div className="mb-8 flex justify-center">
          <div className="relative text-center rounded-full px-3 py-1 text-sm leading-6 border">
            {m.dry_elegant_coyote_trip()}{" "}
            <a href="#" className="font-semibold text-primary">
              <span className="absolute inset-0" aria-hidden="true"></span>
              {m.top_livid_snake_advise()}{" "}
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-4xl max-w-2xl mx-auto font-bold tracking-tight  sm:text-6xl">
            {m.away_careful_gorilla_heal()}
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 ">
            {m.curly_great_porpoise_favor()}
          </p>
          <div className="max-w-3xl mx-auto mt-10">
            <div className="flex items-center justify-center">
              <div className="join-md">
                {/* <Autocomplete
                startContent={<Circle size={18} />}
                items={PLACES}
                displayValue={(item) => item.name.en}
                getKey={(item) => item.osm}
                filterItems={(items, query) =>
                  items.filter((item) =>
                    item.name.en
                      .toLocaleLowerCase()
                      .startsWith(query.toLocaleLowerCase())
                  )
                }
                placeholder="From..."
              /> */}
                {/* <Autocomplete
                startContent={<MapPin size={18} />}
                items={PLACES}
                displayValue={(item) => item.name.en}
                getKey={(item) => item.osm}
                filterItems={(items, query) =>
                  items.filter((item) =>
                    item.name.en
                      .toLocaleLowerCase()
                      .startsWith(query.toLocaleLowerCase())
                  )
                }
                placeholder="To..."
              /> */}
                {/* <DateTimePickerDemo /> */}
                {/* <Select
                // hour
                startContent={<Users size={18} />}
                items={new Array(4).fill(0).map((_, i) => ({
                  value: (i + 1).toString(),
                  label: (i + 1).toString(),
                }))}
                displayValue={(item) => item.label}
                getKey={(item) => item.value.toString()}
                placeholder=""
                className="md:w-[60px]"
              /> */}

                {/* <Button>Search</Button> */}
              </div>
            </div>
            <div className="flex animate-pulse items-center justify-center mt-4 gap-2">
              <div className="text-left text-sm">
                {m.polite_vivid_macaw_mop()}{" "}
                <span className="font-bold">{m.day_gross_goose_heal()}</span>{" "}
                {m.loved_frail_camel_advise()}
              </div>
            </div>
          </div>
          {/* <div className="mt-10 flex flex-col sm:flex-row sm:items-center justify-center gap-3">
          <Button color="primary" className="font-bold" size="lg">
            Get started
          </Button>
          <Button variant="ghost" className="font-bold" size="lg">
            See Demo
          </Button>
        </div> */}
        </div>
      </div>
    </div>
  );
}

export function HeroTwo() {
  return (
    <>
      <div className="relative overflow-hidden">
        <div className="container mt-xl">
          <div className="max-w-2xl text-center mx-auto">
            <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl">
              Designed for you to get more{" "}
              <span className="text-primary">simple</span>
            </h1>
            <p className="mt-3 text-lg text-gray-800">
              Build your business here. Take it anywhere.
            </p>
          </div>

          <div className="mt-10 relative max-w-5xl mx-auto">
            <div className="w-full object-cover h-96 sm:h-[480px] bg-[url('https://profile-images.xing.com/images/a3964f7a8525aa2dafe2da45d095e55c-1/luka-gorgadze.1024x1024.jpg')] bg-no-repeat bg-center bg-cover rounded-xl"></div>

            <div className="absolute inset-0 size-full">
              <div className="flex flex-col justify-center items-center size-full">
                <a
                  className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                  href="#"
                >
                  <svg
                    className="flex-shrink-0 size-4"
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
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  Play the overview
                </a>
              </div>
            </div>

            <div className="absolute bottom-12 -start-20 -z-[1] size-48 bg-gradient-to-b from-orange-500 to-white p-px rounded-lg">
              <div className="bg-white size-48 rounded-lg"></div>
            </div>

            <div className="absolute -top-12 -end-20 -z-[1] size-48 bg-gradient-to-t from-primary to-cyan-400 p-px rounded-full">
              <div className="bg-white size-48 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
