"use server";
import { redirect } from "next/navigation";
import requestOrder from "./request-order";
import { getUser } from "../utils/auth";

const FIXED_PRICE = 0.0; // 0.1 = 10 tetri

const CALLBACK_URL = "https://hoppla.ge/api/bog/callback";

export default async function bookRide(rideId: string) {
    const user = await getUser();
    if (!user) {
        return {
            success: false,
        };
    }

    const external_order_id = user.id + "_" + rideId;

    const orderRequest = await requestOrder({
        callback_url: CALLBACK_URL,
        external_order_id,
        purchase_units: {
            total_amount: FIXED_PRICE,
            basket: [
                { product_id: rideId, quantity: 1, unit_price: FIXED_PRICE },
            ],
        },
    });

    if (orderRequest.success) {
        redirect(orderRequest._links.redirect.href);
    }

    return {
        success: false,
    };
}
