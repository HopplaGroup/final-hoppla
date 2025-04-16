"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import * as m from "@/paraglide/messages.js";
import { languageTag } from "@/paraglide/runtime";
import { LanguageSwitcher } from "@/components/common/navbar/language-switcher";
import { useRouter } from "@/lib/i18n";
import { ArrowBigLeftDash, ArrowLeft, House } from "lucide-react";

const privacyPolicyData = {
    title: {
        ka: "წინამდებარე დოკუმენტი (შემდგომში - პოლიტიკა) წარმოადგენს შპს ჰოპპლა გრუპის (ს/ნ 405703715) (შემდგომში - კომპანია) პოლიტიკას, რომელიც განსაზღვრავს კომპანიის მიერ პერსონალური მონაცემების მოპოვების, დამუშავებისა და დაცვის პრინციპებს და მექანიზმებს. პოლიტიკის მიზანია: 1) კომპანიის მიერ მომხმარებლების პერსონალური მონაცემების დამუშავებისას ადამიანის უფლებებისა და თავისუფლებების, მათ შორის, პირადი ცხოვრების ხელშეუხებლობის დაცვა; 2) პერსონალური მონაცემების უსაფრთხოების უზრუნველყოდა; 3) პერსონალური მონაცემების დაცვასთან დაკავშირებული ნორმატიული აქტების, მათ შორის, პერსონალურ მონაცემთა დაცვის შესახებ საქართველოს კანონის დებულებების დაცვა.",
        en: "This document (hereinafter - the Policy) represents the policy of Hoppla Group LLC (ID 405703715) (hereinafter - the Company), which defines the principles and mechanisms for collecting, processing, and protecting personal data by the Company. The purpose of the Policy is: 1) to protect human rights and freedoms, including privacy, when processing users' personal data by the Company; 2) to ensure the security of personal data; 3) to comply with regulatory acts related to personal data protection, including the provisions of the Georgian Law on Personal Data Protection.",
    },
    sections: [
        {
            title: {
                ka: "1. პერსონალური მონაცემების მოპოვება",
                en: "1. Collection of Personal Data",
            },
            content: [
                {
                    ka: "1.1. მომხმარებელი კომპანიის კუთვნილ მობილურ აპლიკაციაში რეგისტრაციის დროს, შესაბამისი ველების შევსების გზით, კომპანიას ნებაყოფლობით გადასცემს შემდეგ პერსონალურ მონაცემებს:",
                    en: "1.1. During registration in the Company's mobile application, by filling in the appropriate fields, the user voluntarily provides the Company with the following personal data:",
                },
            ],
            list: [
                {
                    ka: "1.1.1. სახელი ან/და გვარი;",
                    en: "1.1.1. First name and/or last name;",
                },
                {
                    ka: "1.1.2. პირადი მობილურის ნომერი;",
                    en: "1.1.2. Personal mobile number;",
                },
                {
                    ka: "1.1.3. მომხმარებლის ადგილსამყოფელი/ლოკაცია.",
                    en: "1.1.3. User's location.",
                },
            ],
            additionalContent: [
                {
                    ka: "1.2. კომპანიისათვის პერსონალური მონაცემების გადაცემის შემდეგ, მათში ცვლილებების განხორციელების შემთხვევაში, მომხმარებელი ვალდებულია გონივრულ ვადაში მიაწოდოს კომპანიას ინფორმაცია აღნიშნული ცვლილებების თაობაზე.",
                    en: "1.2. After providing personal data to the Company, in case of any changes to this data, the user is obligated to provide the Company with information about these changes within a reasonable time.",
                },
            ],
        },
        {
            title: {
                ka: "2. პერსონალური მონაცემების მოპოვებისა და დამუშავების მიზანი",
                en: "2. Purpose of Collecting and Processing Personal Data",
            },
            content: [
                {
                    ka: "2.1. კომპანია მომხმარებლებისგან პერსონალურ მონაცემებს იღებს და ამუშავებს მომხმარებელთა იდენტიფიკაციისა და მათთვის ხარისხიანი მომსახურების გაწევის მიზნით.",
                    en: "2.1. The Company receives and processes personal data from users for the purpose of user identification and providing quality service to them.",
                },
            ],
        },
        {
            title: {
                ka: "3. პერსონალური მონაცემების დამუშავების პრინციპები",
                en: "3. Principles of Personal Data Processing",
            },
            content: [
                {
                    ka: "3.1. კომპანია პერსონალური მონაცემების დამუშავების დროს ხელმძღვანელობს შემდეგი პრინციპებით:",
                    en: "3.1. The Company is guided by the following principles when processing personal data:",
                },
            ],
            list: [
                {
                    ka: "3.1.1. პერსონალური მონაცემები უნდა დამუშავდეს სამართლიანად და კანონიერად, მონაცემთა სუბიექტის ღირსების შეულახავად;",
                    en: "3.1.1. Personal data must be processed fairly and lawfully, without violating the dignity of the data subject;",
                },
                {
                    ka: "3.1.2. მონაცემები უნდა დამუშავდეს მხოლოდ კონკრეტული, მკაფიოდ განსაზღვრული, კანონიერი მიზნებისთვის. დაუშვებელია მონაცემთა შემდგომი დამუშავება სხვა, თავდაპირველ მიზანთან შეუთავსებელი მიზნით;",
                    en: "3.1.2. Data must be processed only for specific, clearly defined, legitimate purposes. Further processing of data for another purpose incompatible with the original purpose is not permitted;",
                },
                {
                    ka: "3.1.3. პერსონალური მონაცემები შეიძლება დამუშავდეს მხოლოდ იმ მოცულობით, რომელიც აუცილებელია შესაბამისი კანონიერი მიზნის მისაღწევად. მონაცემები უნდა იყოს იმ მიზნის ადეკვატური და პროპორციული, რომლის მისაღწევადაც მუშავდება ისინი;",
                    en: "3.1.3. Personal data may be processed only to the extent necessary to achieve the relevant legitimate purpose. Data must be adequate and proportionate to the purpose for which it is processed;",
                },
                {
                    ka: "3.1.4. მონაცემები ნამდვილი და ზუსტი უნდა იყოს და, საჭიროების შემთხვევაში, უნდა განახლდეს. კანონიერი საფუძვლის გარეშე შეგროვებული და დამუშავების მიზნის შეუსაბამო მონაცემები უნდა დაიბლოკოს, წაიშალოს ან განადგურდეს;",
                    en: "3.1.4. Data must be genuine and accurate and, if necessary, updated. Data collected without legal basis and incompatible with the purpose of processing must be blocked, deleted, or destroyed;",
                },
                {
                    ka: "3.1.5. მონაცემები შეიძლება შენახულ იქნეს მხოლოდ იმ ვადით, რომელიც აუცილებელია მონაცემთა დამუშავების მიზნის მისაღწევად. იმ მიზნის მიღწევის შემდეგ, მონაცემები უნდა დაიბლოკოს, წაიშალოს ან განადგურდეს.",
                    en: "3.1.5. Data may be stored only for the period necessary to achieve the purpose of data processing. After achieving this purpose, the data must be blocked, deleted, or destroyed.",
                },
            ],
        },
        {
            title: {
                ka: "4. პერსონალური მონაცემების შენახვის ვადა",
                en: "4. Personal Data Storage Period",
            },
            content: [
                {
                    ka: "4.1. კომპანიის მიერ მომხმარებელთა პერსონალური მონაცემების შენახვა ხდება კომპანიასა და მომხმარებელს შორის სამართლებრივი ურთიერთობის არსებობის პერიოდში.",
                    en: "4.1. The Company stores users' personal data during the period of legal relationship between the Company and the user.",
                },
                {
                    ka: "4.2. კომპანიასა და მომხმარებელს შორის სამართლებრივი ურთიერთობის შეწყვეტის შემდეგ, კომპანია აარქივებს მომხმარებლის შესახებ პერსონალურ მონაცემებს. ამ შემთხვევაში, მომხმარებელი უფლებამოსილია კომპანიას მოსთხოვოს მის შესახებ დაცული პერსონალური მონაცემების განადგურება.",
                    en: "4.2. After termination of the legal relationship between the Company and the user, the Company archives the personal data about the user. In this case, the user is entitled to request the Company to destroy the personal data stored about them.",
                },
            ],
        },
        {
            title: {
                ka: "5. მომხმარებლისთვის ინფორმაციის მიწოდება",
                en: "5. Providing Information to the User",
            },
            content: [
                {
                    ka: "5.1. მომხმარებლის მიერ მოთხოვნის შემთხვევაში, კომპანია ვალდებულია მომხმარებელს მიაწოდოს შემდეგი სახის ინფორმაცია:",
                    en: "5.1. Upon request by the user, the Company is obligated to provide the user with the following types of information:",
                },
            ],
            list: [
                {
                    ka: "5.1.1. ინფორმაცია კომპანიაში დაცული მომხმარებლის პერსონალური მონაცემების შესახებ;",
                    en: "5.1.1. Information about the user's personal data stored in the Company;",
                },
                {
                    ka: "5.1.2. მონაცემთა დამუშავებაზე პასუხისმგებელი თანამშრომლის ვინაობა;",
                    en: "5.1.2. Identity of the employee responsible for data processing;",
                },
                {
                    ka: "5.1.3. მონაცემთა დამუშავების სამართლებრივი საფუძველი;",
                    en: "5.1.3. Legal basis for data processing;",
                },
                {
                    ka: "5.1.4. მონაცემთა დამუშავების მიზეზი და მიზანი;",
                    en: "5.1.4. Reason and purpose of data processing;",
                },
                {
                    ka: "5.1.5. ვისზე გაიცა მის შესახებ მონაცემები, მონაცემთა გაცემის საფუძველი და მიზანი.",
                    en: "5.1.5. To whom their data was disclosed, the basis and purpose of data disclosure.",
                },
            ],
        },
        {
            title: {
                ka: "6. უფლებამოსილი პირის/კომპანიის უფლებამოსილი თანამშრომლის მიერ მონაცემების დამუშავება",
                en: "6. Processing of Data by an Authorized Person/Company's Authorized Employee",
            },
            content: [
                {
                    ka: "6.1. კომპანიის უფლებამოსილი პირი/შესაბამისი თანამშრომელი მომხმარებლის პერსონალურ მონაცემებს ამუშავებს მხოლოდ წინამდებარე პოლიტიკით განსაზღვრული მიზნით. დაუშვებელია უფლებამოსილი პირის მიერ ნებისმიერი სხვა მიზნით მონაცემთა შემდგომი დამუშავება. დაუშვებელია, უფლებამოსილმა პირმა მონაცემთა დამუშავების უფლება გადასცეს სხვა პირს კომპანიის უფლებამოსილი წარმომადგენლის (დირექტორის) თანხმობის გარეშე.",
                    en: "6.1. The Company's authorized person/relevant employee processes the user's personal data only for the purpose defined by this Policy. Further processing of data for any other purpose by the authorized person is not permitted. The authorized person may not transfer the right to process data to another person without the consent of the Company's authorized representative (director).",
                },
                {
                    ka: "6.2. მონაცემთა დამუშავებაზე უფლებამოსილი პირი ვალდებულია, მონაცემთა დასაცავად მიიღოს შესაბამისი ორგანიზაციული და ტექნიკური ზომები.",
                    en: "6.2. The person authorized to process data is obligated to take appropriate organizational and technical measures to protect the data.",
                },
                {
                    ka: "6.3. კომპანია ვალდებულია მონიტორინგი გაუწიოს უფლებამოსილი პირის მიერ მონაცემთა დამუშავებას.",
                    en: "6.3. The Company is obligated to monitor the processing of data by the authorized person.",
                },
            ],
        },
        {
            title: {
                ka: "7. ფაილური სისტემა და ფაილური სისტემის კატალოგი",
                en: "7. File System and File System Catalog",
            },
            content: [
                {
                    ka: "7.1. კომპანია უზრუნველყოფს პერსონალური მონაცემების სტრუქტურიზებას და მათ დალაგებას კონკრეტული კრიტერიუმების მიხედვით (ფაილური სისტემა).",
                    en: "7.1. The Company ensures the structuring of personal data and their arrangement according to specific criteria (file system).",
                },
                {
                    ka: "7.2. კომპანია ვალდებულია თითოეულ ფაილურ სისტემასთან დაკავშირებით აწარმოოს ფაილური სისტემის კატალოგი და აღრიცხოს შემდეგი ინფორმაცია:",
                    en: "7.2. The Company is obligated to maintain a file system catalog for each file system and record the following information:",
                },
            ],
            list: [
                {
                    ka: "7.2.1. ფაილური სისტემის სახელწოდება;",
                    en: "7.2.1. Name of the file system;",
                },
                {
                    ka: "7.2.2. კომპანიისა და მონაცემთა დამუშავებაზე უფლებამოსილი პირის დასახელება და მისამართი, მონაცემთა შენახვის ან/და დამუშავების ადგილი;",
                    en: "7.2.2. Name and address of the Company and the person authorized to process data, place of data storage and/or processing;",
                },
                {
                    ka: "7.2.3. მონაცემთა დამუშავების სამართლებრივი საფუძველი;",
                    en: "7.2.3. Legal basis for data processing;",
                },
                {
                    ka: "7.2.4. მონაცემთა სუბიექტების/მომხმარებლების კატეგორია;",
                    en: "7.2.4. Category of data subjects/users;",
                },
                {
                    ka: "7.2.5. მონაცემთა კატეგორია ფაილურ სისტემაში;",
                    en: "7.2.5. Category of data in the file system;",
                },
                {
                    ka: "7.2.6. მონაცემთა დამუშავების მიზანი;",
                    en: "7.2.6. Purpose of data processing;",
                },
                {
                    ka: "7.2.7. მონაცემთა შენახვის ვადა;",
                    en: "7.2.7. Data storage period;",
                },
                {
                    ka: "7.2.8. მონაცემთა სუბიექტის უფლების შეზღუდვის ფაქტი და საფუძველი;",
                    en: "7.2.8. Fact and basis for restriction of data subject's rights;",
                },
                {
                    ka: "7.2.9. ფაილურ სისტემაში განთავსებულ მონაცემთა მიმღები და მათი კატეგორიები;",
                    en: "7.2.9. Recipients of data placed in the file system and their categories;",
                },
                {
                    ka: "7.2.10. მონაცემთა სხვა სახელმწიფოსა და საერთაშორისო ორგანიზაციისათვის გადაცემის შესახებ ინფორმაცია და ასეთი გადაცემის საფუძველი;",
                    en: "7.2.10. Information about the transfer of data to another state and international organization and the basis for such transfer;",
                },
                {
                    ka: "7.2.11. მონაცემთა უსაფრთხოების დაცვისათვის დადგენილი პროცედურის ზოგადი აღწერილობა.",
                    en: "7.2.11. General description of the procedure established for data security protection.",
                },
            ],
        },
        {
            title: {
                ka: "8. პერსონალური მონაცემების უსაფრთხოება",
                en: "8. Personal Data Security",
            },
            content: [
                {
                    ka: "8.1. კომპანიის მიერ მოპოვებული/მომხმარებლისგან მოწოდებული პერსონალური მონაცემები ინახება ელექტრონული ფორმით, კომპანიის იმ მობილური აპლიკაციის სისტემაში, რომელშიც რეგისტრირდება მომხმარებელი (შემდგომში - სისტემა).",
                    en: "8.1. Personal data obtained by the Company/provided by the user is stored in electronic form, in the system of the Company's mobile application in which the user registers (hereinafter - the System).",
                },
                {
                    ka: "8.2. სისტემაში არსებულ პერსონალურ მონაცემებზე წვდომა აქვს კომპანიის შესაბამის თანამშრომელს, რომელიც ვალდებულია უზრუნველყოს მონაცემების საიდუმლოება, მათ შორის სამსახურებრივი უფლებამოსილების შეწყვეტის შემდეგ.",
                    en: "8.2. The personal data in the System is accessible to the relevant employee of the Company, who is obligated to ensure the confidentiality of the data, including after the termination of official authority.",
                },
            ],
        },
        {
            title: {
                ka: "9. პერსონალური მონაცემების გადაცემა მესამე პირისათვის",
                en: "9. Transfer of Personal Data to Third Parties",
            },
            content: [
                {
                    ka: "9.1. კომპანია უფლებამოსილია, მისი უფლებების დასაცავად, მომხმარებლის პერსონალური მონაცემები გადასცეს იმ მესამე პირებს, რომლებიც მონაწილეობას იღებენ კომპანიის უფლებების დაცვის პროცესში, მაგალითად: ადვოკატს, ექსპერტს და ა.შ.",
                    en: "9.1. The Company is authorized, to protect its rights, to transfer the user's personal data to those third parties who participate in the process of protecting the Company's rights, for example: a lawyer, an expert, etc.",
                },
                {
                    ka: "9.2. კომპანია უფლებამოსილია, მომხმარებლის პერსონალური მონაცემები გადასცეს იმ კონტრაქტორს, რომელიც უზრუნველყოფს კომპანიის მიერ მომხმარებლისთვის გასაწევი მომსახურების ხელშეწყობას.",
                    en: "9.2. The Company is authorized to transfer the user's personal data to the contractor who ensures the facilitation of the service to be provided by the Company to the user.",
                },
                {
                    ka: "9.3. კომპანიის მიერ მომხმარებლების პერსონალური მონაცემების მესამე პირთათვის გადაცემა შეიძლება განხორციელდეს მხოლოდ იმ მოცულობით, რაც აუცილებელია გადაცემის მიზნებისთვის.",
                    en: "9.3. The transfer of users' personal data by the Company to third parties may be carried out only to the extent necessary for the purposes of the transfer.",
                },
                {
                    ka: "9.4. წინამდებარე პოლიტიკის 9.1 და 9.2 ქვეპუნქტებით განსაზღვრულ შემთხვევაში, კომპანია ვალდებულია უზრუნველყოს პერსონალური მონაცემების მიმღები მესამე პირებისათვის პერსონალური მონაცემების კონფიდენციალურობის დაცვის ვალდებულების დაკისრება.",
                    en: "9.4. In the cases defined by sub-paragraphs 9.1 and 9.2 of this Policy, the Company is obligated to ensure that the third-party recipients of personal data are obligated to protect the confidentiality of personal data.",
                },
                {
                    ka: "9.5. პერსონალური მონაცემების მესამე პირებისათვის გადაცემის შემთხვევაში კომპანია ვალდებულია მოახდინოს შემდეგი ინფორმაციის შენახვა: რა სახის პერსონალური მონაცემები გადაეცა მესამე პირებს; ვის გადაეცა პერსონალური მონაცემები; როდის და რა სამართლებრივი საფუძვლით მოხდა პერსონალური მონაცემების გადაცემა. აღნიშნული ინფორმაცია უნდა ინახებოდეს მომხმარებლის პერსონალურ მონაცემებთან ერთად მათი შენახვის ვადის განმავლობაში.",
                    en: "9.5. In case of transfer of personal data to third parties, the Company is obligated to store the following information: what type of personal data was transferred to third parties; to whom the personal data was transferred; when and on what legal basis the personal data was transferred. This information must be stored with the user's personal data during their storage period.",
                },
            ],
        },
        {
            title: {
                ka: "10. მხარეთა პასუხისმგებლობა",
                en: "10. Responsibility of the Parties",
            },
            content: [
                {
                    ka: "10.1. წინამდებარე პოლიტიკით გათვალისწინებული მოთხოვნების დარღვევის შემთხვევაში, დაინტერესებული პირის მოთხოვნის საფუძველზე, კომპანია პასუხს აგებს საქართველოს კანონმდებლობით დადგენილი წესით.",
                    en: "10.1. In case of violation of the requirements provided by this Policy, at the request of the interested person, the Company shall be liable in accordance with the procedure established by Georgian legislation.",
                },
            ],
        },
    ],
};

export default function PrivacyPage() {
    const router = useRouter();
    const lang = languageTag();

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto relative ">
                <div className="flex items-center justify-between mb-3 sticky top-0 z-10 bg-background rounded-b-lg w-full p-3 shadow-md">
                    <div className="flex items-center justify-between gap-3">
                        <button
                            onClick={() => router.back()}
                            className="flex items-center text-primary hover:text-primary/80 transition-colors p-3 hover:bg-gray-200 font-bold rounded-full"
                        >
                            <ArrowBigLeftDash className="h-5 w-5 sm:mr-2 stroke-2" />

                            <span className="hidden sm:block">
                                {m.loved_front_polecat_sail()}
                            </span>
                        </button>

                        <button
                            onClick={() => router.push("/")}
                            className="flex items-center text-primary hover:text-primary/80 transition-colors p-3 hover:bg-gray-200 font-bold rounded-full"
                        >
                            <House className="h-5 w-5 sm:mr-2 stroke-2" />
                            <span className="hidden sm:block">
                                {m.gray_odd_panda_cook()}
                            </span>
                        </button>
                    </div>
                    <LanguageSwitcher />
                </div>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="bg-primary px-6 py-4 w-full">
                        <h1 className="text-2xl font-bold text-white">
                            {m.lofty_neat_fireant_catch()}
                        </h1>
                    </div>

                    <div className="p-6">
                        <div className="mb-8 text-gray-800 leading-relaxed">
                            {privacyPolicyData.title[lang]}
                        </div>

                        {privacyPolicyData.sections.map(
                            (section, sectionIndex) => (
                                <div key={sectionIndex} className="mb-8">
                                    <h2 className="text-xl font-semibold mb-4">
                                        {section.title[lang]}
                                    </h2>

                                    {section.content &&
                                        section.content.map(
                                            (paragraph, paraIndex) => (
                                                <p
                                                    key={paraIndex}
                                                    className="mb-3 text-gray-800 leading-relaxed"
                                                >
                                                    {paragraph[lang]}
                                                </p>
                                            )
                                        )}

                                    {section.list && (
                                        <ul className="list-disc ml-6 mt-2 mb-4 space-y-2 text-gray-800">
                                            {section.list.map(
                                                (item, itemIndex) => (
                                                    <li
                                                        key={itemIndex}
                                                        className="leading-relaxed"
                                                    >
                                                        {item[lang]}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    )}

                                    {section.additionalContent &&
                                        section.additionalContent.map(
                                            (paragraph, paraIndex) => (
                                                <p
                                                    key={paraIndex}
                                                    className="mt-3 text-gray-800 leading-relaxed"
                                                >
                                                    {paragraph[lang]}
                                                </p>
                                            )
                                        )}
                                </div>
                            )
                        )}
                    </div>
                </div>

                <div className="mt-6 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} {m.cool_next_piranha_dream()}{" "}
                    (ს/ნ 405703715). {m.red_free_mantis_splash()}.
                </div>
            </div>
        </div>
    );
}
