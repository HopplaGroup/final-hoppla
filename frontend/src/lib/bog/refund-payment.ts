import "server-only";

import getToken from "./get-token";

type RefundResponse = {
  key: string;
  message: string;
  action_id: string;
  success: true;
};

type ErrorResponse = {
  success: false;
};

export default async function refundPayment(
  orderId: string,
  amount?: number
): Promise<RefundResponse | ErrorResponse> {
  const refundUrl = `https://api.bog.ge/payments/v1/payment/refund/${orderId}`;

  try {
    const tokenResponse = await getToken();
    if (!tokenResponse.success) {
      return {
        success: false,
      };
    }
    const response = await fetch(refundUrl, {
      method: "POST",
      headers: {
        "Accept-Language": "ka",
        Authorization: `Bearer ${tokenResponse.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...(amount && { amount }),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Refund payment failed:", errorData);
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
