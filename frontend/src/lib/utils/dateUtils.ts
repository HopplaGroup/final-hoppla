// /lib/date-utils.ts
import { languageTag } from "@/paraglide/runtime";
import * as dateFns from "date-fns";
import { enUS, ka } from "date-fns/locale";

// Map of supported locales to date-fns locale objects
const localeMap = {
    en: enUS,
    ka: ka,
};

// Helper function to get the current date-fns locale object
function getCurrentDateFnsLocale() {
    const currentLocale = languageTag(); // This should return 'en', 'ka', etc.
    return localeMap[currentLocale] || enUS; // Default to English if locale not found
}

// Create wrapped versions of date-fns functions with automatic locale
export const formatDistanceToNow = (
    date: Date | number,
    options?: Omit<dateFns.FormatDistanceToNowOptions, "locale">
) => {
    return dateFns.formatDistanceToNow(date, {
        ...options,
        locale: getCurrentDateFnsLocale(),
    });
};

export const formatDistance = (
    date: Date | number,
    baseDate: Date | number,
    options?: Omit<dateFns.FormatDistanceOptions, "locale">
) => {
    return dateFns.formatDistance(date, baseDate, {
        ...options,
        locale: getCurrentDateFnsLocale(),
    });
};

export const format = (
    date: Date | number,
    formatStr: string,
    options?: Omit<dateFns.FormatOptions, "locale">
) => {
    return dateFns.format(date, formatStr, {
        ...options,
        locale: getCurrentDateFnsLocale(),
    });
};

// Add more wrapped functions as needed
export const formatRelative = (
    date: Date | number,
    baseDate: Date | number,
    options?: Omit<dateFns.FormatRelativeOptions, "locale">
) => {
    return dateFns.formatRelative(date, baseDate, {
        ...options,
        locale: getCurrentDateFnsLocale(),
    });
};

export const { addDays, subDays, isToday, isBefore, isAfter /* etc */ } =
    dateFns;
