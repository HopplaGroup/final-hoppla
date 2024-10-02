"use client";
import { defaultSortBy, sortByOptions } from "@/lib/constants/search";
import { languageTag } from "@/paraglide/runtime";
import {
  parseAsInteger,
  parseAsString,
  useQueryState,
  useQueryStates,
} from "nuqs";

export default function SortBy({ search }: { search: any }) {
  const [orderBy, setOrderBy] = useQueryState(
    "sortBy",
    parseAsString.withDefault(defaultSortBy)
  );

  const [_, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  return (
    <div className="">
      <div className="text-xl font-semibold mb-2">Sort By</div>
      <div className="w-[calc(100vw-5rem)] lg:flex flex-col lg:w-auto space-x-2 lg:space-x-0 gap-2 overflow-x-auto min-w-0 whitespace-nowrap">
        {sortByOptions.map((option) => (
          <label
            key={option.value}
            className="min-w-[100px] max-w-[300px] inline-flex items-center p-3 h-14 w-full bg-white border shadow-sm rounded-lg text-sm focus:border-primary focus:ring-primary"
          >
            <input
              type="radio"
              className="shrink-0 mt-0.5  rounded-full text-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none "
              value={option.value}
              checked={orderBy === option.value}
              onChange={(e) => {
                setPage(1);
                setOrderBy(e.target.value);
                search();
              }}
            />
            <span className="text-sm  ms-3">{option.label[languageTag()]}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
