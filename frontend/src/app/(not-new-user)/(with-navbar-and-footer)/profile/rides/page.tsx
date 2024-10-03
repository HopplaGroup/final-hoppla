import RidesTable from "./rides-table/rides-table";
import * as m from "@/paraglide/messages.js";

export default function ProfileRidesPage() {
  return (
    <div className="">
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
        {m.odd_sleek_mink_taste()}
      </h1>

      <p className="mt-4 leading-relaxed text-gray-500 max-w-xl lg:max-w-3xl">
        {m.actual_smart_swan_nail()}
      </p>

      <div className="mt-4 w-full">
        <RidesTable />
      </div>
    </div>
  );
}
