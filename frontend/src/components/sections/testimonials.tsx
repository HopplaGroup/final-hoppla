import Image from "next/image";
import mariami from "../../../public/assets/mari2.webp";
import ilia from "../../../public/assets/ilia.webp";
import gaioz from "../../../public/assets/gaioz.jpg";
import * as m from "@/paraglide/messages.js";

export function Testimonials() {
  return (
    <div className="my-12 mt-32 container">
      <div className=" text-center">
        <h2 className="text-4xl font-extrabold text-gray-800">
          {m.large_bad_swan_zoom()}
        </h2>
        <p className="text-sm mt-4 leading-relaxed text-gray-800 md:max-w-xl mx-auto">
          {m.active_that_reindeer_thrive()}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-md:gap-12 max-md:justify-center text-center max-md:max-w-lg mx-auto mt-16">
        <div className="rounded-md">
          <div className="flex flex-col items-center">
            <Image
              width={200}
              height={200}
              alt="Mariami"
              src={mariami}
              className="w-24 h-24 object-cover rounded-full shadow-xl border-2 border-white"
            />
            <div className="mt-6 font-semibold leading-tight">
              <h4 className="text-sm font-extrabold text-gray-800 md:max-w-sm">
                {m.loose_odd_macaw_love()}
              </h4>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-sm leading-relaxed text-gray-800 md:max-w-sm">
              {m.teary_nice_swan_adapt()}
            </p>
          </div>

          <div className="flex justify-center space-x-1 mt-4">
            <svg
              className="w-4 fill-primary"
              viewBox="0 0 14 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
            </svg>
            <svg
              className="w-4 fill-primary"
              viewBox="0 0 14 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
            </svg>
            <svg
              className="w-4 fill-primary"
              viewBox="0 0 14 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
            </svg>
            <svg
              className="w-4 fill-primary"
              viewBox="0 0 14 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
            </svg>
            <svg
              className="w-4 fill-primary"
              viewBox="0 0 14 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
            </svg>
          </div>
        </div>

        <div className="rounded-md">
          <div className="flex flex-col items-center">
            <Image
              width={200}
              height={200}
              alt="Ilia"
              src={ilia}
              className="w-24 h-24 object-cover rounded-full shadow-xl border-2 border-white"
            />
            <div className="mt-6 font-semibold leading-tight">
              <h4 className="text-sm font-extrabold text-gray-800 md:max-w-sm">
                {m.watery_formal_mantis_fear()}
              </h4>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-sm leading-relaxed text-gray-800 md:max-w-sm">
              {m.teal_yummy_kangaroo_care()}
            </p>
          </div>

          <div className="flex justify-center space-x-1 mt-4">
            <svg
              className="w-4 fill-primary"
              viewBox="0 0 14 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
            </svg>
            <svg
              className="w-4 fill-primary"
              viewBox="0 0 14 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
            </svg>
            <svg
              className="w-4 fill-primary"
              viewBox="0 0 14 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
            </svg>
            <svg
              className="w-4 fill-primary"
              viewBox="0 0 14 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
            </svg>
            <svg
              className="w-4 fill-primary"
              viewBox="0 0 14 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
            </svg>
          </div>
        </div>

        <div className="rounded-md">
          <div className="flex flex-col items-center">
            <Image
              width={200}
              height={200}
              alt="Gaioz"
              src={gaioz}
              className="w-24 h-24 object-cover rounded-full shadow-xl border-2 border-white"
            />
            <div className="mt-6 font-semibold leading-tight">
              <h4 className="text-sm font-extrabold text-gray-800 md:max-w-sm">
                {m.loose_flat_dove_nourish()}
              </h4>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-sm leading-relaxed text-gray-800 md:max-w-sm">
              {m.bad_bland_swan_taste()}
            </p>
          </div>

          <div className="flex justify-center space-x-1 mt-4">
            <svg
              className="w-4 fill-primary"
              viewBox="0 0 14 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
            </svg>
            <svg
              className="w-4 fill-primary"
              viewBox="0 0 14 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
            </svg>
            <svg
              className="w-4 fill-primary"
              viewBox="0 0 14 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
            </svg>
            <svg
              className="w-4 fill-primary"
              viewBox="0 0 14 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
            </svg>
            <svg
              className="w-4 fill-primary"
              viewBox="0 0 14 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
