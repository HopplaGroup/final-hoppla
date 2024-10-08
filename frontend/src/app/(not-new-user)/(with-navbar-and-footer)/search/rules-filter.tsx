"use client";
import { useFindManyRule } from "@/lib/hooks";
import { Rule } from "@prisma/client";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { ruleToLabel } from "./_components/rule-icons";
import { languageTag } from "@/paraglide/runtime";
import * as m from "@/paraglide/messages.js";
export default function RulesFilter({ search }: { search: any }) {
    const [ruleIds, setRuleIds] = useQueryState(
        "rules",
        parseAsArrayOf(parseAsString)
    );
    const { data: rules } = useFindManyRule();
    return (
        <div className="space-y-2">
            <h3 className="text-lg font-semibold">
                {m.clean_neat_polecat_aid()}
            </h3>
            <div className="w-[calc(100vw-5rem)] lg:flex flex-col lg:w-auto space-x-2 lg:space-x-0 gap-2 overflow-x-auto min-w-0 whitespace-nowrap">
                {rules?.map((rule) => (
                    <label
                        key={rule.id}
                        className="min-w-[100px] max-w-[300px] inline-flex  items-center p-3 h-14 w-full bg-white  shadow-sm rounded-lg text-sm border focus:border-primary focus:ring-primary"
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
                        <span className="text-sm  ms-3">
                            {ruleToLabel[rule.description][languageTag()]}
                        </span>
                    </label>
                ))}
            </div>
        </div>
    );
}
