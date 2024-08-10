import { Navigation, Middleware, PrefixStrategy } from "@inlang/paraglide-next";
import { AvailableLanguageTag } from "@/paraglide/runtime";

export const strategy = PrefixStrategy<AvailableLanguageTag>({
  prefixDefault: "always",
});

export const middleware = Middleware({ strategy });
export const { Link, useRouter, usePathname, redirect, permanentRedirect } =
  Navigation({ strategy });
