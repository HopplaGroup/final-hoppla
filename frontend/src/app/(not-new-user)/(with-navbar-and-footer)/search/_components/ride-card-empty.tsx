import { Button } from "@/components/ui/button";
import { Car } from "lucide-react";
import Link from "next/link";
import React from "react";
import * as m from "@/paraglide/messages.js";

const RideCardEmpty = () => {
  return (
    <div className="hidden xl:flex p-6 border rounded-lg bg-white border-dashed flex-col items-center justify-center">
      <div className="rounded-full bg-gray-100 p-4 mb-4">
        <Car size={32} className="text-gray-300" />
      </div>
      <div className="text-center mb-4">
        <h3 className="font-semibold text-gray-900">
          {m.big_neat_husky_feel()}
        </h3>
        <p className="text-sm text-gray-500">{m.male_game_osprey_dazzle()}</p>
      </div>

      <Link href="/send-driver-verification">
        <Button>{m.trick_polite_frog_gleam()}</Button>
      </Link>
    </div>
  );
};

export default RideCardEmpty;
