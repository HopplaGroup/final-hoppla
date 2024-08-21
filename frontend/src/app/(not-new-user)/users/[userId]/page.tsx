import { Logo } from "@/components/common/logo";
import {
  Bookmark,
  Calendar,
  ChevronDown,
  ChevronLeft,
  Image,
  Mail,
  MessageCircle,
  Phone,
  Plus,
  Stars,
  Text,
  User,
} from "lucide-react";

type UserPageProps = {
  params: { userId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function UserPage({ params, searchParams }: UserPageProps) {
  const { userId } = params;

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
          {/* <div className="bg-primary/10 size-16 flex items-center justify-center rounded-full">
            <Check className="text-primary font-bold" size={24} />
          </div> */}
          {/* <div>
            <img
              src="https://yt3.googleusercontent.com/-0Rgm4PydVPspcst43ybfo4us_zM6_4ZCdrmI5LB4Dxq6MJNg9oZ2u7mq7YDwmc8WIrVU-m0xTQ=s900-c-k-c0x00ffffff-no-rj"
              className="size-16 border-primary border-2 rounded-full object-cover"
              alt=""
            />
          </div> */}
        </div>
        <h3 className="mt-5 font-semibold">User Profile</h3>
        <h2 className="mt-2 font-bold text-3xl">Misho Dzuliashvili</h2>
        <div className="flex items-center gap-5">
          <h4 className=" flex items-center gap-2 mt-4">
            <Bookmark size={22} /> <span>Save to Bookmarks</span>
          </h4>
          <h4 className=" flex items-center gap-2 mt-4">
            <MessageCircle size={22} /> <span>Add to Contact</span>
          </h4>
        </div>
        <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-md mt-5">
          <ChevronDown size={22} />
          <span className="font-semibold">Details about user</span>
        </div>
        <div className="max-w-md mt-5">
          <dl className="-my-3 divide-y divide-gray-100 text-sm">
            <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900 flex items-center gap-2">
                <Phone size={22} />
                Phone
              </dt>
              <dd className="text-gray-700 sm:col-span-2">+995 579 19 59 54</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900 flex items-center gap-2">
                <Mail size={22} />
                E-Mail
              </dt>
              <dd className="text-gray-700 sm:col-span-2">
                mishodzuliashvili1@gmail.com
              </dd>
            </div>

            <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900  flex items-center gap-2">
                <User size={22} /> Sex
              </dt>
              <dd className="text-gray-700 sm:col-span-2">Man</dd>
            </div>

            {/* rating, bio, birthDate */}
            <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900  flex items-center gap-2">
                <Calendar size={22} /> Age
              </dt>
              <dd className="text-gray-700 sm:col-span-2">22 years old</dd>
            </div>
            <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900  flex items-center gap-2">
                <Stars size={22} /> Rating
              </dt>
              <dd className="text-gray-700 sm:col-span-2">4.5</dd>
            </div>
            <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900  flex items-start gap-2">
                <Text size={22} /> Bio
              </dt>
              <dd className="text-gray-700 sm:col-span-2">
                This driver is trully amazing and funny person
              </dd>
            </div>
            <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900 flex items-start gap-2">
                <Image size={22} /> Photo
              </dt>
              <dd className="text-gray-700 sm:col-span-2">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-lg px-2 py-2 font-semibold">
                  <img
                    src="https://yt3.googleusercontent.com/-0Rgm4PydVPspcst43ybfo4us_zM6_4ZCdrmI5LB4Dxq6MJNg9oZ2u7mq7YDwmc8WIrVU-m0xTQ=s900-c-k-c0x00ffffff-no-rj"
                    className="size-40 rounded-lg object-cover"
                    alt=""
                  />
                </div>
              </dd>
            </div>

            {/* <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900 flex items-center gap-2">
                <Users size={22} /> Passengers
              </dt>
              <dd className="text-gray-700 sm:col-span-2">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-2 py-2 font-semibold">
                  <img
                    src="https://yt3.googleusercontent.com/-0Rgm4PydVPspcst43ybfo4us_zM6_4ZCdrmI5LB4Dxq6MJNg9oZ2u7mq7YDwmc8WIrVU-m0xTQ=s900-c-k-c0x00ffffff-no-rj"
                    className="size-6 rounded-full object-cover"
                    alt=""
                  />
                  <img
                    src="https://yt3.googleusercontent.com/-0Rgm4PydVPspcst43ybfo4us_zM6_4ZCdrmI5LB4Dxq6MJNg9oZ2u7mq7YDwmc8WIrVU-m0xTQ=s900-c-k-c0x00ffffff-no-rj"
                    className="size-6 rounded-full object-cover"
                    alt=""
                  />
                  <img
                    src="https://yt3.googleusercontent.com/-0Rgm4PydVPspcst43ybfo4us_zM6_4ZCdrmI5LB4Dxq6MJNg9oZ2u7mq7YDwmc8WIrVU-m0xTQ=s900-c-k-c0x00ffffff-no-rj"
                    className="size-6 rounded-full object-cover"
                    alt=""
                  />
                </div>
              </dd>
            </div> */}
            {/* <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">
                <Button>Book Now</Button>
              </dt>
              <dd className="text-gray-700 sm:col-span-2">
                There is still 3 places remaining
              </dd>
            </div> */}
          </dl>
        </div>
        {/* <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-md mt-5">
          <ChevronDown size={22} />
          <span className="font-semibold">Car Details</span>
        </div> */}
        {/* <div className="max-w-md mt-5">
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
        </div> */}
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
