import { SVGCanCarryBag, SVGNoSmoking, SVGPetsAllowed } from "./svgs";

export const ruleToLabel: Record<string, { ka: string; en: string }> = {
  "No Smoking": {
    ka: "სიგარეტის მიცემის აკრძალვა",
    en: "No Smoking",
  },
  "Pets Allowed": {
    ka: "ცხოვრებაში შეშვება",
    en: "Pets Allowed",
  },
  "Can Carry Bag": {
    ka: "შეიძლება ჩაიტვირთოს ჩანთა",
    en: "Can Carry Bag",
  },
  "Only Woman": {
    ka: "მხარდამჭერი მხარე",
    en: "Only Woman",
  },
};

export const ruleToIcon: Record<string, React.ReactNode> = {
  "No Smoking": (
    <SVGNoSmoking className="fill-gray-500 w-4 h-4  sm:w-7 sm:h-7" />
  ),
  "Pets Allowed": (
    <SVGPetsAllowed className="fill-gray-500  w-4 h-4 sm:w-7  sm:h-7" />
  ),
  "Can Carry Bag": (
    <SVGCanCarryBag className="fill-gray-500  w-4 h-4 sm:w-7  sm:h-7" />
  ),
};

// misho rulebi dzan mokleebi unda iyos 2 sityviani maqs, imitom rom mere maxinjad gamochndeba iq da 3 ze davfiqse rulebi

export const dummyRules = ["No Smoking", "Pets Allowed", "Can Carry Bag"];

/*
!No-Smoking
!Music On
!Quiet Ride
!Pets Allowed
!Luggage Space Available
!AC/Heater On
!Women Only
!Flexible Timing
!Free Wi-Fi
!No Food/Drink*/
