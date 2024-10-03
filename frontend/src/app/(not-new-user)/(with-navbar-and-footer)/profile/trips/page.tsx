import TripsTable from "./trips-table/rides-table";
import * as m from "@/paraglide/messages.js";

export default function ProfileTripsPage() {
  return (
    <div className="">
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
        {m.agent_awful_parrot_enrich()}
      </h1>

      <p className="mt-4 leading-relaxed text-gray-500 max-w-xl lg:max-w-3xl">
        {m.tired_wise_boar_commend()}
      </p>

      <div className="mt-4 w-full">
        <TripsTable />
      </div>
    </div>
  );
}
