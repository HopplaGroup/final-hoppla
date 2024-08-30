"use client";
import { Rule } from "@prisma/client";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";

export default function RulesFilter({ rules }: { rules: Rule[] }) {
  const [ruleIds, setRuleIds] = useQueryState(
    "ruleIds",
    parseAsArrayOf(parseAsString).withOptions({
      shallow: false,
    })
  );

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">Rules</h3>
      <div className="space-y-1">
        {rules.map((rule) => (
          <label key={rule.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={ruleIds?.includes(rule.id)}
              onChange={(e) =>
                setRuleIds(
                  e.target.checked
                    ? [...(ruleIds || []), rule.id]
                    : ruleIds
                    ? ruleIds.filter((id) => id !== rule.id)
                    : []
                )
              }
              className="form-checkbox"
            />
            <span>{rule.description}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
