import { languageTag } from "@/paraglide/runtime";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, usePathname } from "@/lib/i18n";
import { Button } from "../ui/actions/button";
import * as m from "@/paraglide/messages.js";
import { Globe } from "lucide-react";
export function LanguageSwitcher() {
    const languages = {
        ka: {
            label: "ქართული",
            flagImg: "/assets/ka-flag.jpg",
        },
        en: {
            label: "English",
            flagImg: "/assets/en-flag.jpg",
        },
    };

    const currentLanguage = languageTag();
    const pathname = usePathname();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    // size="default-icon"

                    className="p-0 pl-1 pr-1 rounded-full flex gap-2 px-4"
                >
                    {/* {languages[currentLanguage].flagImg && (
                        <img
                            src={languages[currentLanguage].flagImg}
                            alt={languages[currentLanguage].label}
                            className="md:rounded-md w-6 h-6 object-cover outline outline-1 outline-gray-300 rounded-full"
                        />
                    )} */}
                    {/* globe */}
                    <Globe className=" " size={18} />{" "}
                    <span className="hidden sm:block">
                        {languages[currentLanguage].label}
                    </span>
                    {/* <span className="hidden md:block">
            {languages[currentLanguage].label}
          </span> */}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent style={{ zIndex: 999 }}>
                <DropdownMenuLabel>
                    {m.bold_bland_puffin_fetch()}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {Object.keys(languages).map((lang) => (
                    <DropdownMenuItem key={lang} asChild>
                        <Link
                            className="cursor-pointer"
                            href={pathname}
                            locale={lang as any}
                        >
                            <img
                                // @ts-ignore
                                src={languages[lang].flagImg}
                                // @ts-ignore
                                alt={languages[lang].label}
                                className="h-5 w-8 object-cover mr-2"
                            />{" "}
                            {/* @ts-ignore */}
                            {languages[lang].label}
                        </Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
