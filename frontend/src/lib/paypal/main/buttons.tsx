"use client";

import { paypalCaptureOrder, paypalCreateOrder } from "./actions";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useEffect, useState } from "react";
import { OrderData } from "../schema";
import { cn } from "@/lib/utils/cn";
import { menv } from "@/lib/utils/menv";

type Props = {
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
  orderData: OrderData;
  isDisabled?: boolean;
};

export function PaypalButtons({
  onError: _onError,
  onSuccess: _onSuccess,
  orderData,
  isDisabled,
}: Props) {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [isDisabled, orderData]);

  console.log({
    key,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onSuccess = (message: string) => {
    _onSuccess && _onSuccess(message);
  };

  const onError = (message: string) => {
    _onError && _onError(message);
  };

  const createOrder = async () => {
    let response = await paypalCreateOrder(orderData);
    if (!response.success) {
      console.log(response.message);
      onError(response.message);
      return "";
    }
    return response.data.orderID;
  };

  const onApprove = async (innner: any) => {
    const response = await paypalCaptureOrder(innner.orderID, orderData);
    if (!response.success) {
      onError(response.message);
      return;
    }
    onSuccess(response.message);
  };

  if (!isMounted) {
    return (
      <div className="h-[144px] w-full animate-pulse">
        <div className="h-[50px] mb-[15px] bg-gray-300 rounded-full"></div>
        <div className="h-[50px] mb-[15px] bg-gray-300 rounded-full"></div>
        <div className="h-[14px] w-full max-w-[140px] mx-auto bg-gray-300 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[144px]">
      {isLoading && (
        <div className="absolute left-0 top-0 h-full w-full animate-pulse">
          <div className="h-[50px] mb-[15px] bg-gray-300 rounded-full"></div>
          <div className="h-[50px] mb-[15px] bg-gray-300 rounded-full"></div>
          <div className="h-[14px] w-full max-w-[140px] mx-auto bg-gray-300 rounded-full"></div>
        </div>
      )}
      <div
        className={cn({
          "pointer-events-none opacity-50": isLoading || isDisabled,
        })}
      >
        <PayPalScriptProvider
          options={{
            clientId: menv.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
            currency: "USD",
            intent: "capture",
          }}
        >
          <PayPalButtons
            onInit={() => {
              setIsLoading(false);
            }}
            key={key}
            style={{
              color: "blue",
              disableMaxWidth: true,
              shape: "pill",
              label: "pay",
              tagline: false,
              height: 50,
            }}
            createOrder={createOrder}
            onApprove={onApprove}
          />
        </PayPalScriptProvider>
      </div>
    </div>
  );
}
