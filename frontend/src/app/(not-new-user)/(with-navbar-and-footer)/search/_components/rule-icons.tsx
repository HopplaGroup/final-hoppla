import {
  SVGBeQuiet,
  SVGCanCarryBag,
  SVGCanStopAnywhere,
  SVGClock,
  SVGFan,
  SVGMask,
  SVGMusic,
  SVGNoFood,
  SVGNoLuggage,
  SVGNoSmoking,
  SVGPetsAllowed,
  SVGSpeedometer,
  SVGTeddy,
  SVGWoman,
} from "./svgs";

export const ruleToLabel: Record<string, { ka: string; en: string }> = {
  "No Smoking": {
    ka: "არ ვეწევით",
    en: "No Smoking",
  },
  "Pets Allowed": {
    ka: "ცხოველები დაიშვება",
    en: "Pets Allowed",
  },
  "Can Carry Bag": {
    ka: "ხელბარგი",
    en: "Can Carry Bag",
  },

  "Only Woman": {
    ka: "მხოლოდ ქალები",
    en: "Only Woman",
  },
  "No Music": {
    ka: "მუსიკას არ ვრთავ",
    en: "No Music",
  },
  "Your Music": {
    ka: "თქვენ არჩევთ მუსიკას",
    en: "Your Music",
  },
  "Driver Chooses Music": {
    ka: "მძღოლი არჩევს მუსიკას",
    en: "Driver Chooses Music",
  },
  "No Food": {
    ka: "მანქანაში ნუ შეჭამთ",
    en: "No Food",
  },
  "Be Quiet": {
    ka: "ჩუმად",
    en: "Be Quiet",
  },
  "Max Speed": {
    ka: "80 კმ/სთ",
    en: "80 km/h",
  },
  "No Drinks": {
    ka: "მანქანაში ნუ დალევთ",
    en: "No Drinks",
  },
  "Air Conditioning": {
    ka: "კონდიციონერი ჩართული",
    en: "Air Conditioning",
  },
  "Heater On": {
    ka: "გამათბობელი ჩართული",
    en: "Heater On",
  },

  "No Kids": {
    ka: "ბავშვები არ მიმყავს",
    en: "No Kids",
  },
  "Mask Required": {
    ka: "პირბადით დაიშვებით",
    en: "Mask Required",
  },

  "No Heavy Luggage": {
    ka: "მძიმე ბარგის აკრძალვა",
    en: "No Heavy Luggage",
  },
  "No Waiting for Late Passengers": {
    ka: "ვერ დაგელოდებით ვინც დააგვიანებს",
    en: "No Waiting for Late Passengers",
  },

  "Can Stop Anywhere": {
    ka: "გავჩერდეთ სადაც გინდათ",
    en: "Can Stop Anywhere",
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
  "Only Woman": <SVGWoman className="fill-gray-500  w-4 h-4 sm:w-7  sm:h-7" />,
  "No Music": <SVGMusic className="fill-gray-500  w-4 h-4 sm:w-7  sm:h-7" />,
  "Your Music": <SVGMusic className="fill-gray-500  w-4 h-4 sm:w-7  sm:h-7" />,
  "Driver Chooses Music": (
    <SVGMusic className="fill-gray-500  w-4 h-4 sm:w-7  sm:h-7" />
  ),
  "No Food": <SVGNoFood className="fill-gray-500  w-4 h-4 sm:w-7  sm:h-7" />,
  "No Drinks": <SVGNoFood className="fill-gray-500  w-4 h-4 sm:w-7  sm:h-7" />,
  "Be Quiet": <SVGBeQuiet className="fill-gray-500  w-4 h-4 sm:w-7  sm:h-7" />,
  "Max Speed": (
    <SVGSpeedometer className="fill-gray-500  w-4 h-4 sm:w-7  sm:h-7" />
  ),
  "Air Conditioning": (
    <SVGFan className="fill-gray-500  w-4 h-4 sm:w-7  sm:h-7" />
  ),
  "Heater On": <SVGFan className="fill-gray-500  w-4 h-4 sm:w-7  sm:h-7" />,
  "No Kids": <SVGTeddy className="fill-gray-500  w-4 h-4 sm:w-7  sm:h-7" />,
  "Mask Required": (
    <SVGMask className="fill-gray-500  w-4 h-4 sm:w-7  sm:h-7" />
  ),
  "No Heavy Luggage": (
    <SVGNoLuggage className="fill-gray-500  w-4 h-4 sm:w-7  sm:h-7" />
  ),
  "No Waiting for Late Passengers": (
    <SVGClock className="fill-gray-500  w-4 h-4 sm:w-7  sm:h-7" />
  ),
  "Can Stop Anywhere": (
    <SVGCanStopAnywhere className="fill-gray-500  w-4 h-4 sm:w-7  sm:h-7" />
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
