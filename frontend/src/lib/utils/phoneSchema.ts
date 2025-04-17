import { z } from "zod";
import { PhoneNumberUtil } from "google-libphonenumber";

const phoneUtil = PhoneNumberUtil.getInstance();

export const zodPhoneSchema = z.string().refine((value) => {
  try {
    const number = phoneUtil.parse(value);
    return phoneUtil.isValidNumber(number);
  } catch (error) {
    return false;
  }
});