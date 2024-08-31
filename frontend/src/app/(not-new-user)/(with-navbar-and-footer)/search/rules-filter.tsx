"use client";
import { useFindManyRule } from "@/lib/hooks";
import { Rule } from "@prisma/client";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";

export default function RulesFilter({ search }: { search: any }) {
  const [ruleIds, setRuleIds] = useQueryState(
    "rules",
    parseAsArrayOf(parseAsString)
  );
  const { data: rules } = useFindManyRule();
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">Rules</h3>
      <div className="space-y-1">
        {rules?.map((rule) => (
          <label
            key={rule.id}
            className="max-w-xs flex items-center p-3 h-14 w-full bg-white border-2 border-dashed rounded-lg text-sm focus:border-primary focus:ring-primary"
          >
            <input
              type="checkbox"
              checked={ruleIds?.includes(rule.id)}
              onChange={(e) => {
                setRuleIds(
                  e.target.checked
                    ? [...(ruleIds || []), rule.id]
                    : ruleIds
                    ? ruleIds.filter((id) => id !== rule.id)
                    : []
                );
                search();
              }}
              className="shrink-0 mt-0.5  rounded-full text-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none "
            />
            <span className="text-sm  ms-3">{rule.description}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
