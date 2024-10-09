"use client";
import { useFindManyRule } from "@/lib/hooks";
import { Rule } from "@prisma/client";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { ruleToLabel } from "./_components/rule-icons";
import { languageTag } from "@/paraglide/runtime";
import * as m from "@/paraglide/messages.js";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function RulesFilter({ search }: { search: any }) {
  const [ruleIds, setRuleIds] = useQueryState(
    "rules",
    parseAsArrayOf(parseAsString)
  );
  const [open, setOpen] = useState(false);

  const { data: rules } = useFindManyRule();
  return (
    <div className="space-y-2">
      <div className="block lg:hidden">
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger className="flex items-center gap-1 justify-center p-3 w-full bg-white border rounded-lg">
            {m.clean_neat_polecat_aid()}
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerDescription className="flex flex-col gap-2 overflow-auto h-full max-h-[400px]">
                {rules?.map((rule) => (
                  <label
                    key={rule.id}
                    className="flex items-center p-3 h-14 w-full bg-white  shadow-sm rounded-lg text-sm border focus:border-primary focus:ring-primary"
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
                    <span className="text-sm ms-3">
                      {ruleToLabel[rule.description][languageTag()].length > 26
                        ? ruleToLabel[rule.description][languageTag()].slice(
                            0,
                            26
                          ) + "..."
                        : ruleToLabel[rule.description][languageTag()]}
                    </span>
                  </label>
                ))}
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose className="w-full">
                <Button className="w-full">დახურვა</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
      <div className="hidden lg:block">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="pt-0 pb-2">
              <h3 className="text-xl font-semibold">
                {m.clean_neat_polecat_aid()}
              </h3>
            </AccordionTrigger>
            <AccordionContent>
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
                    <span className="text-sm ms-3">
                      {ruleToLabel[rule.description][languageTag()].length > 26
                        ? ruleToLabel[rule.description][languageTag()].slice(
                            0,
                            26
                          ) + "..."
                        : ruleToLabel[rule.description][languageTag()]}
                    </span>
                  </label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
