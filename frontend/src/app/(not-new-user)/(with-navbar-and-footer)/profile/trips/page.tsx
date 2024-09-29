import TripsTable from "./trips-table/rides-table";

export default function ProfileTripsPage() {
    return (
        <div className="">
            <h1 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                My Trips
            </h1>

            <p className="mt-4 leading-relaxed text-gray-500 max-w-xl lg:max-w-3xl">
                The table below shows all the rides you are a part of as a
                passenger
            </p>

            <div className="mt-4 w-full">
                <TripsTable />
            </div>
        </div>
    );
}
