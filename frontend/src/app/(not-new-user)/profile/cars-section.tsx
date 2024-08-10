import { Button } from "@/components/ui/actions/button";
import { Car } from "@prisma/client";
import { Plus } from "lucide-react";

export function CarsSection({ cars }: { cars: Car[] }) {
  return (
    <div className="">
      <div>{/* <button>Add Car</button> */}</div>
      <div className="flex items-center flex-col gap-5">
        {/* <div key={car.id}>
            <h3>{car.name}</h3>
            <p>{car.mark}</p>
            <p>{car.plate}</p>
            <p>{car.capacity}</p>
            <p>{car.type}</p>
          </div> */}

        <Button
          variant="outline"
          href="/driver/add-car"
          className="w-full py-10"
        >
          <Plus /> Add Car
        </Button>
        {cars.map((car) => (
          <div
            key={car.id}
            className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl border p-3 max-w-xs md:max-w-3xl mx-auto bg-white"
          >
            <div className="w-full md:w-1/3 bg-white grid place-items-center">
              <img
                src={car.photos?.[0] || ""}
                // src="https://images.unsplash.com/photo-1508528075895-be7a6cabd37a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1vdW50YWluJTIwd2F0ZXJmYWxsfGVufDB8fDB8fHww"
                alt="tailwind logo"
                className="rounded-xl"
              />
            </div>
            <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
              <div className="flex justify-between item-center">
                <p className="text-gray-500 font-medium hidden md:block">
                  {car.mark}
                </p>
                <div className="flex items-center">
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-yellow-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg> */}
                  <p className="text-gray-600 font-bold text-sm ml-1">
                    {car.plate}

                    <span className="text-gray-500 font-normal"></span>
                  </p>
                </div>
                <div className="flex items-center">
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-pink-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clip-rule="evenodd"
                    />
                  </svg> */}
                  <p className="text-gray-600 font-bold text-sm ml-1">
                    {car.type}

                    <span className="text-gray-500 font-normal"></span>
                  </p>
                </div>
                <div className="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800 hidden md:block">
                  #{car.id.slice(0, 7)}
                </div>
              </div>
              <h3 className="font-black text-gray-800 md:text-3xl text-xl">
                {car.name}
              </h3>
              <p className="md:text-lg text-gray-500 text-base">
                The best kept secret of The Bahamas is the country’s sheer size
                and diversity. With 16 major islands, The Bahamas is an
                unmatched destination
              </p>
              <p className="text-xl font-black text-gray-800">
                {car.capacity}{" "}
                <span className="font-normal text-gray-600 text-base">man</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
