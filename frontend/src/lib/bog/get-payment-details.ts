import "server-only";

import getToken from "./get-token";
import { PaymentDetailsResponse } from "./types";

type ErrorResponse = {
    success: false;
};

export default async function getPaymentDetails(
    orderId: string
): Promise<PaymentDetailsResponse | ErrorResponse> {
    const url = `https://api.bog.ge/payments/v1/receipt/${orderId}`;

    try {
        const tokenResponse = await getToken();
        if (!tokenResponse.success) {
            return {
                success: false,
            };
        }
        const response = await fetch(url, {
            method: "POST",
            headers: {
                // "Accept-Language": "ka",
                Authorization: `Bearer ${tokenResponse.access_token}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            return {
                success: false,
            };
        }

        const data = await response.json();
        return {
            ...data,
            success: true,
        };
    } catch (error) {
        return {
            success: false,
        };
    }
}
