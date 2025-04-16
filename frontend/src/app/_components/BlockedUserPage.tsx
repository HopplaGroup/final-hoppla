import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import * as m from "@/paraglide/messages.js";
import Logo from "./Logo";

export default function BlockedUserPage() {
    return (
        <div className="">
            <section className="">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div>
                        <Logo />
                    </div>
                    <div className="w-full text-center p-6 ">
                        <h1 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            {m.less_candid_cheetah_charm()}
                        </h1>
                        <p className="">{m.light_weary_rooster_relish()}</p>
                        <div className="flex flex-col items-center justify-center mt-6 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                            <a
                                href="mailto:hopplagroup@gmail.com"
                                className="flex items-center justify-center w-full px-6 py-3 text-sm text-white bg-primary rounded-lg sm:w-auto sm:px-8 sm:py-4 hover:bg-primary/60"
                            >
                                {m.elegant_direct_barbel_inspire()}
                            </a>
                            <LogoutLink className="flex items-center justify-center w-full px-6 py-3 text-sm text-primary bg-gray-100 rounded-lg sm:w-auto sm:px-8 sm:py-4 hover:bg-gray-200 font-semibold">
                                {m.civil_every_ant_fold()}
                            </LogoutLink>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
