"use client";
import { parseAsInteger, useQueryState, useQueryStates } from "nuqs";

const SORT_BY_OPTIONS = [
  {
    value: "price",
    direction: "desc",
    label: "Price",
  },
  // {
  //   value: "departure",
  //   label: "Departure",
  // },
  {
    value: "createdAt",
    label: "Created At",
  },
];

export default function SortBy() {
  const [orderBy, setOrderBy] = useQueryState("orderBy", {
    shallow: false,
  });

  const [_, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({ shallow: false })
  );

  const [orderByDirection, setOrderByDirection] =
    useQueryState("orderByDirection");

  return (
    <div className="space-x-2">
      <label>Sort by</label>
      <select
        value={orderBy || "createdAt"}
        onChange={(e) => {
          setPage(1);
          setOrderBy(e.target.value);
        }}
        className="form-select"
      >
        {SORT_BY_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {/* <select
        value={orderByDirection || "desc"}
        onChange={(e) => setOrderByDirection(e.target.value)}
        className="form-select"
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select> */}
    </div>
  );
}
