import "server-only";
import { OrderData } from "./schema";

export async function paypalCreateOrderDB(orderID: string, data: OrderData) {
  switch (data.type) {
    case "buyPremium":
      // Update DB here
      break;
    default:
      break;
  }
}

export function getOrderPriceByData(data: OrderData) {
  switch (data.type) {
    case "buyPremium":
      return "5"; // 5 dollar
    default:
      return "0";
  }
}
