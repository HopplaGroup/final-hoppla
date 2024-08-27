import Image from "next/image";
import { Logo } from "../logo";

const navigation = {
  connect: [
    { name: "Book Meeting", href: "" },
    {
      name: "Twitter",
      href: "https://twitter.com/justansub",
    },
    {
      name: "Github",
      href: "https://www.youtube.com/@SpeedyBrand-SEO",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/speedy-brand-inc/",
    },
  ],
  company: [
    { name: "Blogs", href: "/" },
    { name: "Pricing", href: "/" },
    { name: "Affiliate Partner", href: "/" },
    { name: "AI For Enterprise", href: "/" },
  ],
};

const TwoColumnFooter = () => {
  return (
    <footer aria-labelledby="footer-heading" className="container mb-10 mt-10">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="">
        <div className="flex flex-col justify-between lg:flex-row">
          <div className="space-y-8">
            <Logo />
            <p className="text-md max-w-xs leading-6 text-gray-700 dark:text-gray-300">
              Travel to your desired destination with the help of HOPPLA. Get
              the latest information and book a ticket with your smartphone.
            </p>
            <div className="flex space-x-6 text-sm text-gray-700  dark:text-gray-300">
              <div>Made with ❤️ by Hoppla.</div>
            </div>
          </div>
          {/* Navigations */}
          <div className="mt-16 grid grid-cols-2 gap-14 md:grid-cols-2 lg:mt-0 xl:col-span-2">
            <div className="md:mt-0">
              <h3 className="text-sm font-semibold leading-6 text-gray-900  dark:text-gray-200">
                Connect
              </h3>
              <div className="mt-6 space-y-4">
                {navigation.connect.map((item) => (
                  <div key={item.name}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm leading-6 text-gray-700 hover:text-gray-900 dark:text-gray-600 hover:dark:text-gray-200"
                    >
                      {item.name}
                    </a>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200">
                  Website
                </h3>
                <div className="mt-6 space-y-4">
                  {navigation.company.map((item) => (
                    <div key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-700 hover:text-gray-900 dark:text-gray-600 hover:dark:text-gray-200"
                      >
                        {item.name}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24 dark:border-gray-100/10">
          <p className="text-xs leading-5 text-gray-700 dark:text-gray-300">
            &copy; 2024 Hoppla Group. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default TwoColumnFooter;
