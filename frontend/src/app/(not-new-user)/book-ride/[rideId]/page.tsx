import { Logo } from "@/components/common/logo";
import { Button } from "@/components/ui/button";
import {
  Bookmark,
  Calendar,
  CarTaxiFront,
  Check,
  ChevronDown,
  ChevronLeft,
  CircleDot,
  Clock,
  Coins,
  DollarSign,
  HandCoins,
  Image,
  MapPin,
  MessageSquareDot,
  PanelTopDashed,
  PersonStanding,
  Plus,
  Star,
  Stars,
  Type,
  User,
  Users,
} from "lucide-react";

type BookRidePageProps = {
  params: { rideId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function BookRidePage({
  params,
  searchParams,
}: BookRidePageProps) {
  const { rideId } = params;

  return (
    <div className="grid grid-cols-[400px,1fr]">
      <div className="min-h-screen bg-gray-100 p-10">
        <div className="mx-2 pb-4">
          <Logo />
        </div>
        <div className="flex items-center gap-2 font-semibold">
          <ChevronLeft size={30} /> <span>Go Back</span>
        </div>
        <div className="mt-4 bg-white shadow-sm rounded-lg p-5">
          <div className="flex items-center justify-center gap-2 font-medium">
            <Plus size={22} /> Add Review
          </div>
        </div>
        <div className="mt-4 bg-white shadow-sm rounded-lg">
          <div>
            <div className="p-5">
              <div className="bg-gray-100 rounded-lg p-3">
                {`"This driver is trully amazing and funny person"`}
              </div>
            </div>
            <div className="flex justify-between border-t border-t-gray-200 p-5">
              <div>
                <h3 className="font-medium">Misho Dzuliashvili</h3>
                <p className="flex items-center gap-2">
                  <span className="font-semibold">4.5</span>{" "}
                  <Stars className="text-primary" size={18} />
                </p>
              </div>
              <div>
                <img
                  src="https://yt3.googleusercontent.com/-0Rgm4PydVPspcst43ybfo4us_zM6_4ZCdrmI5LB4Dxq6MJNg9oZ2u7mq7YDwmc8WIrVU-m0xTQ=s900-c-k-c0x00ffffff-no-rj"
                  className="size-10 rounded-md object-cover"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-10 pl-20 pr-10 h-screen overflow-auto">
        <div className="flex items-center justify-between">
          <div className="bg-primary/10 size-16 flex items-center justify-center rounded-full">
            <Check className="text-primary font-bold" size={24} />
          </div>
          {/* <div>
            <img
              src="https://yt3.googleusercontent.com/-0Rgm4PydVPspcst43ybfo4us_zM6_4ZCdrmI5LB4Dxq6MJNg9oZ2u7mq7YDwmc8WIrVU-m0xTQ=s900-c-k-c0x00ffffff-no-rj"
              className="size-16 border-primary border-2 rounded-full object-cover"
              alt=""
            />
          </div> */}
        </div>
        <h3 className="mt-5 font-semibold">Ride booking</h3>
        <h2 className="mt-2 font-bold text-3xl">28 April</h2>
        <div className="flex items-center gap-5">
          <h4 className=" flex items-center gap-2 mt-4">
            <Bookmark size={22} /> <span>Save to Bookmarks</span>
          </h4>
          <h4 className=" flex items-center gap-2 mt-4">
            <Calendar size={22} /> <span>Add to Calendar</span>
          </h4>
        </div>
        <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-md mt-5">
          <ChevronDown size={22} />
          <span className="font-semibold">Details about the ride</span>
        </div>
        <div className="max-w-md mt-5">
          <dl className="-my-3 divide-y divide-gray-100 text-sm">
            <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900 flex items-center gap-2">
                <CircleDot size={22} />
                From
              </dt>
              <dd className="text-gray-700 sm:col-span-2">Tbilisi</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900 flex items-center gap-2">
                <MapPin size={22} />
                To
              </dt>
              <dd className="text-gray-700 sm:col-span-2">Gori</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900  flex items-center gap-2">
                <DollarSign size={22} /> Price
              </dt>
              <dd className="text-gray-700 sm:col-span-2">53.23 GEL</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900  flex items-center gap-2">
                <Clock size={22} /> Departure
              </dt>
              <dd className="text-gray-700 sm:col-span-2">
                28 April 2022, 10:00
              </dd>
            </div>
            <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900 flex items-center gap-2">
                <User size={22} /> Driver
              </dt>
              <dd className="text-gray-700 sm:col-span-2">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-2 pr-3 py-2 font-semibold">
                  <img
                    src="https://yt3.googleusercontent.com/-0Rgm4PydVPspcst43ybfo4us_zM6_4ZCdrmI5LB4Dxq6MJNg9oZ2u7mq7YDwmc8WIrVU-m0xTQ=s900-c-k-c0x00ffffff-no-rj"
                    className="size-6 rounded-full object-cover"
                    alt=""
                  />
                  <span>Misho Dzuliashvili</span>
                </div>
              </dd>
            </div>

            <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900 flex items-center gap-2">
                <Users size={22} /> Passengers
              </dt>
              <dd className="text-gray-700 sm:col-span-2">
                <div className="inline-flex -space-x-1 overflow-hidden bg-primary/10 text-primary rounded-full px-2 py-2 font-semibold">
                  <img
                    src="https://yt3.googleusercontent.com/-0Rgm4PydVPspcst43ybfo4us_zM6_4ZCdrmI5LB4Dxq6MJNg9oZ2u7mq7YDwmc8WIrVU-m0xTQ=s900-c-k-c0x00ffffff-no-rj"
                    className="size-6 border-background border-2 rounded-full object-cover"
                    alt=""
                  />
                  <img
                    src="https://yt3.googleusercontent.com/-0Rgm4PydVPspcst43ybfo4us_zM6_4ZCdrmI5LB4Dxq6MJNg9oZ2u7mq7YDwmc8WIrVU-m0xTQ=s900-c-k-c0x00ffffff-no-rj"
                    className="size-6 border-background border-2 rounded-full object-cover"
                    alt=""
                  />
                  <img
                    src="https://yt3.googleusercontent.com/-0Rgm4PydVPspcst43ybfo4us_zM6_4ZCdrmI5LB4Dxq6MJNg9oZ2u7mq7YDwmc8WIrVU-m0xTQ=s900-c-k-c0x00ffffff-no-rj"
                    className="size-6 border-background border-2 rounded-full object-cover"
                    alt=""
                  />
                </div>
              </dd>
            </div>
            <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">
                <Button>Book Now</Button>
              </dt>
              <dd className="text-gray-700 sm:col-span-2">
                There is still 3 places remaining
              </dd>
            </div>
          </dl>
        </div>
        <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-md mt-5">
          <ChevronDown size={22} />
          <span className="font-semibold">Car Details</span>
        </div>
        <div className="max-w-md mt-5">
          <dl className="-my-3 divide-y divide-gray-100 text-sm">
            <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900 flex items-center gap-2">
                <Type size={22} />
                Type
              </dt>
              <dd className="text-gray-700 sm:col-span-2">Standard</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900 flex items-center gap-2">
                <PanelTopDashed size={22} />
                Plate
              </dt>
              <dd className="text-gray-700 sm:col-span-2">AA-101-BB</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900  flex items-center gap-2">
                <CarTaxiFront size={22} /> Mark
              </dt>
              <dd className="text-gray-700 sm:col-span-2">Mercedes</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900  flex items-center gap-2">
                <Users size={22} /> Capacity
              </dt>
              <dd className="text-gray-700 sm:col-span-2">6</dd>
            </div>
            <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900 flex items-start gap-2">
                <Image size={22} /> Photo
              </dt>
              <dd className="text-gray-700 sm:col-span-2">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-md px-2 py-2 font-semibold">
                  <img
                    src="https://yt3.googleusercontent.com/-0Rgm4PydVPspcst43ybfo4us_zM6_4ZCdrmI5LB4Dxq6MJNg9oZ2u7mq7YDwmc8WIrVU-m0xTQ=s900-c-k-c0x00ffffff-no-rj"
                    className="size-40 rounded-md object-cover"
                    alt=""
                  />
                </div>
              </dd>
            </div>
          </dl>
        </div>
        {/* <div className="mt-4">
          <div className="bg-gray-100 flex rounded-lg p-4 gap-3 w-1/2">
            <div className="min-w-12">
              <img
                src="https://yt3.googleusercontent.com/-0Rgm4PydVPspcst43ybfo4us_zM6_4ZCdrmI5LB4Dxq6MJNg9oZ2u7mq7YDwmc8WIrVU-m0xTQ=s900-c-k-c0x00ffffff-no-rj"
                className="size-12 rounded-full object-cover"
                alt=""
              />
            </div>
            <div className="w-full">
              <h3 className="font-semibold">Mercedec Benz</h3>
              <p className="text-sm">CDD - 1900 Garbeni</p>
              <div className="mt-4 flex items-center justify-between w-full">
                <div className="flex items-center gap-2 text-base">
                  <PersonStanding /> Car Capacity
                </div>
                <div className="font-semibold">6</div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
