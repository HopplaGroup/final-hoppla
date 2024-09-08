import { Button } from "@/components/ui/actions/button";
import { Car } from "@prisma/client";
import { Plus } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function CarsSection({ cars }: { cars: Car[] }) {
    return (
        <div className="flex align-middle justify-center">
            <div>{/* <button>Add Car</button> */}</div>

            <Tabs defaultValue="rides" className="w-[800px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="rides">Rides</TabsTrigger>
                    <TabsTrigger value="cars">Cars</TabsTrigger>
                </TabsList>
                <TabsContent value="rides">
                    <div className="grid grid-cols-2 gap-4 mx-auto">
                        <div className="mb-2 flex justify-around flex-row items-center border border-solid border-gray-200 rounded-2xl transition-all duration-500 md:flex-row md:max-w-lg h-40 p-1">
                            <div className="flex items-center w-full md:w-28 h-28">
                                <img
                                    src={
                                        "https://www.carandbike.com/_next/image?url=https%3A%2F%2Fimages.carandbike.com%2Fcar-images%2Fbig%2Fhyundai%2Fcreta%2Fhyundai-creta.jpg%3Fv%3D92&w=3840&q=75"
                                    }
                                    alt="Car image"
                                    className="h-full w-full rounded-2xl object-cover"
                                />
                            </div>
                            <div>
                                <div className="text-xl">TBILISI - BATUMI</div>
                                <div className="text-sm">Friday 14:00</div>
                                <div className="text-sm">Places 4 / 7</div>
                                <div className="text-xs">Car BMW</div>
                            </div>
                        </div>
                        {/* error */}
                        <div className="mb-2 flex justify-around flex-row items-center border border-solid border-gray-200 rounded-2xl transition-all duration-500 md:flex-row md:max-w-lg h-40 p-1">
                            <div className="flex items-center w-full md:w-28 h-28">
                                <img
                                    src={
                                        "https://www.carandbike.com/_next/image?url=https%3A%2F%2Fimages.carandbike.com%2Fcar-images%2Fbig%2Fhyundai%2Fcreta%2Fhyundai-creta.jpg%3Fv%3D92&w=3840&q=75"
                                    }
                                    alt="Car image"
                                    className="h-full w-full rounded-2xl object-cover"
                                />
                            </div>
                            <div>
                                <div className="text-xl">TBILISI - BATUMI</div>
                                <div className="text-sm">Friday 14:00</div>
                                <div className="text-sm">Places 4 / 7</div>
                                <div className="text-xs">Car BMW</div>
                            </div>
                        </div>
                        {/*hehe*/}
                        <div className="mb-2 flex justify-around flex-row items-center border border-solid border-gray-200 rounded-2xl transition-all duration-500 md:flex-row md:max-w-lg h-40 p-1">
                            <div className="flex items-center w-full md:w-28 h-28">
                                <img
                                    src={
                                        "https://www.carandbike.com/_next/image?url=https%3A%2F%2Fimages.carandbike.com%2Fcar-images%2Fbig%2Fhyundai%2Fcreta%2Fhyundai-creta.jpg%3Fv%3D92&w=3840&q=75"
                                    }
                                    alt="Car image"
                                    className="h-full w-full rounded-2xl object-cover"
                                />
                            </div>
                            <div>
                                <div className="text-xl">TBILISI - BATUMI</div>
                                <div className="text-sm">Friday 14:00</div>
                                <div className="text-sm">Places 4 / 7</div>
                                <div className="text-xs">Car BMW</div>
                            </div>
                        </div>
                        {}
                        <div className="mb-2 flex justify-around flex-row items-center border border-solid border-gray-200 rounded-2xl transition-all duration-500 md:flex-row md:max-w-lg h-40 p-1">
                            <div className="flex items-center w-full md:w-28 h-28">
                                <img
                                    src={
                                        "https://www.carandbike.com/_next/image?url=https%3A%2F%2Fimages.carandbike.com%2Fcar-images%2Fbig%2Fhyundai%2Fcreta%2Fhyundai-creta.jpg%3Fv%3D92&w=3840&q=75"
                                    }
                                    alt="Car image"
                                    className="h-full w-full rounded-2xl object-cover"
                                />
                            </div>
                            <div>
                                <div className="text-xl">TBILISI - BATUMI</div>
                                <div className="text-sm">Friday 14:00</div>
                                <div className="text-sm">Places 4 / 7</div>
                                <div className="text-xs">Car BMW</div>
                            </div>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="cars">
                    <div className="w-full">
                        <div className="grid grid-cols-2 gap-4 mx-auto">
                            {cars.map((car) => (
                                <div
                                    key={car.id}
                                    className="mb-2 flex justify-around flex-row items-center border border-solid border-gray-200 rounded-2xl transition-all duration-500 md:flex-row md:max-w-lg h-40 p-1"
                                >
                                    <div className="flex items-center w-full md:w-28 h-28">
                                        <img
                                            src={
                                                car.photos?.[0] ||
                                                "https://pagedone.io/asset/uploads/1695365240.png"
                                            }
                                            alt="Car image"
                                            className="h-full w-full rounded-2xl object-cover"
                                        />
                                    </div>
                                    <div className="p-3 flex flex-col ">
                                        <div className="flex flex-col">
                                            <h4 className="text-lg font-semibold text-gray-900 mb-1 capitalize transition-all duration-500 text-center">
                                                {car.name}
                                            </h4>
                                            <p className="text-lg font-normal text-gray-500 transition-all duration-500 leading-4 mb-4 text-center">
                                                {car.mark}
                                            </p>
                                        </div>

                                        <div>
                                            <button className="bg-indigo-600 shadow-sm rounded-full py-1 px-4 text-xs text-white font-semibold mx-auto">
                                                {car.capacity} seats
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Button
                            variant="outline"
                            href="/driver/add-car"
                            className="w-full py-10"
                        >
                            <Plus /> Add Car
                        </Button>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
