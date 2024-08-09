"use server";

import paypal from "@paypal/checkout-server-sdk";
import { newPaypalClient } from "./paypal-client";
import { getOrderPriceByData, paypalCreateOrderDB } from "../functions";
import { orderDataSchema, OrderData } from "../schema";

export async function paypalCreateOrder(
  data: OrderData
): Promise<ServiceResponse<{ orderID: string }>> {
  try {
    orderDataSchema.parse(data);
    const paypalClient = newPaypalClient();
    let request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: getOrderPriceByData(data),
          },
        },
      ],
    });
    let response = await paypalClient.execute(request);
    if (response.statusCode !== 201) {
      return {
        success: false,
        message: "Some Error Occured at backend",
      };
    }
    const orderID = response.result.id;

    return {
      success: true,
      data: { orderID },
      message: "Order Created",
    };
  } catch (error) {
    return {
      success: false,
      message: "Could Not Found the user",
    };
  }
}

export async function paypalCaptureOrder(
  orderID: string,
  data: OrderData
): Promise<ServiceResponse<{}>> {
  try {
    if (!orderID) {
      return {
        success: false,
        message: "Order ID is required",
      };
    }
    orderDataSchema.parse(data);
    const paypalClient = newPaypalClient();
    let request = new paypal.orders.OrdersCaptureRequest(orderID);
    let response = await paypalClient.execute(request);
    if (!response || response.statusCode !== 201) {
      return {
        success: false,
        message: "Some Error Occured at backend",
      };
    }

    await paypalCreateOrderDB(orderID, data);

    return {
      success: true,
      data: {},
      message: "Order Captured",
    };
  } catch (error) {
    return {
      success: false,
      message: "Could Not Capture the Order",
    };
  }
}
