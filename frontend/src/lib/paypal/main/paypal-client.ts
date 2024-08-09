import "server-only";

import paypal from "@paypal/checkout-server-sdk";
import { menv } from "@/lib/utils/menv";

const configureEnvironment = function () {
  return menv.NODE_ENV === "production"
    ? new paypal.core.LiveEnvironment(
        menv.PAYPAL_CLIENT_ID!,
        menv.PAYPAL_CLIENT_SECRET!
      )
    : new paypal.core.SandboxEnvironment(
        menv.PAYPAL_CLIENT_ID!,
        menv.PAYPAL_CLIENT_SECRET!
      );
};

export const newPaypalClient = function () {
  return new paypal.core.PayPalHttpClient(configureEnvironment());
};
