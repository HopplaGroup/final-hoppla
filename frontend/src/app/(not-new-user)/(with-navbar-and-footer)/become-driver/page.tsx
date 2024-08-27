import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Milestone, Sparkles, Wallet } from "lucide-react";
import carpoolRegistration from "./carpool-registration.svg";

type BecomeDriverPageProps = {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function BecomeDriverPage({
  params,
  searchParams,
}: BecomeDriverPageProps) {
  return (
    <div className="container">
      <section className="overflow-hidden mt-5">
        <div className="bg-white rounded-md overflow-hidden p-7 px-9 mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <AboutUsContent />
          <AboutUsImage />
        </div>
      </section>
    </div>
  );
}

function AboutUsContent() {
  return (
    <div className=" ">
      <div className="lg:max-w-lg">
        <h2 className="text-base font-semibold leading-7 text-primary">
          #1 in transportation
        </h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Become a driver
        </p>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          {`We are always looking for new drivers to join our team. If you are
          passionate about driving and want to make some extra money, then this
          is the perfect opportunity for you. We offer competitive rates and
          flexible hours, so you can work when it suits you best.`}
        </p>
        <FeatureList />
      </div>
      <CallToAction />
    </div>
  );
}

function FeatureList() {
  return (
    <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
      {[
        {
          icon: Sparkles,
          title: "Quality Products",
          description:
            "We only offer the best products from the most reputable brands.",
        },
        {
          icon: Wallet,
          title: "Affordable Prices",
          description:
            "We believe that everyone should have access to the latest tech.",
        },
        {
          icon: Milestone,
          title: "Expert Support",
          description:
            "Our team of experts is here to help you with any questions or concerns.",
        },
      ].map((feature, index) => (
        <FeatureItem key={index} {...feature} />
      ))}
    </dl>
  );
}

function FeatureItem({ icon: Icon, title, description }: any) {
  return (
    <div className="relative pl-9">
      <dt className="inline font-semibold text-gray-900">
        <Icon className="absolute left-1 top-1 h-5 w-5 text-primary" />
        {title}
      </dt>
      <dd className="inline"> {description}</dd>
    </div>
  );
}

function CallToAction() {
  return (
    <div className="mt-10 flex items-center gap-x-6">
      <Button>
        <Link href="/contact-us">Contact Us</Link>
      </Button>
    </div>
  );
}

function AboutUsImage() {
  return (
    <div>
      <Image
        src={carpoolRegistration}
        // src="https://images.unsplash.com/photo-1551739440-5dd934d3a94a?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Tech store showcase"
        className="w-[48rem] h-[600px] object-cover max-w-none rounded-xl sm:w-[57rem]"
        // width={2432}
        // height={1442}
      />
    </div>
  );
}
