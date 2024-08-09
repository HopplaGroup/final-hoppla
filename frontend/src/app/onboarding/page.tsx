import Image from "next/image";
import { UpdateUserForm } from "./update-user-form";
import * as m from "@/paraglide/messages.js";

export default function OnBoardingPage() {
  return (
    <div className="container">
      <div className="mx-auto w-full space-y-8 text-center sm:w-[32rem] mt-10">
        <div className="">
          <div className="gap-12">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {m.ok_fuzzy_jannes_pet()}
              </h1>
              <p className="mt-1 md:text-lg ">{m.basic_ago_baboon_trip()}</p>

              <div className="mt-10 flex items-center justify-center gap-x-5">
                <div className="hidden sm:flex -space-x-2">
                  <Image
                    width={100}
                    height={100}
                    className="inline-block size-8 rounded-full ring-2 ring-background"
                    src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
                    alt="Image Description"
                  />
                  <Image
                    width={100}
                    height={100}
                    className="inline-block size-8 rounded-full ring-2 ring-background"
                    src="https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=320&h=320&q=80"
                    alt="Image Description"
                  />
                  <Image
                    width={100}
                    height={100}
                    className="inline-block size-8 rounded-full ring-2 ring-background"
                    src="https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80"
                    alt="Image Description"
                  />
                  <span className="inline-flex justify-center items-center size-8 rounded-full bg-primary text-background ring-2 ring-background">
                    <svg
                      className="size-3.5"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                  </span>
                </div>
                <span className="text-sm ">{m.these_noble_jannes_find()}</span>
              </div>
            </div>

            <div className="relative w-full max-w-sm mx-auto mt-10">
              <UpdateUserForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
