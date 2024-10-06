export const validSortFields = ["price", "driverAverageRating", "departure"];
export const validSortOrders = ["asc", "desc"];
export const defaultSortBy = "driverAverageRating:desc";

export const sortByOptions = [
  {
    value: "driverAverageRating:desc",
    label: {
      en: "Driver Rating",
      ka: "მძღოლის შეფასება",
    },
  },
  {
    value: "price:asc",
    label: {
      en: "Price (low to high)",
      ka: "ფასი ზრდადობით",
    },
  },
  {
    value: "price:desc",
    label: {
      en: "Price (high to low)",
      ka: "ფასი კლებადობით",
    },
  },
  {
    value: "departure:asc",
    label: {
      en: "Departure (earliest first)",
      ka: "გასვლა (უახლოესი)",
    },
  },
];
