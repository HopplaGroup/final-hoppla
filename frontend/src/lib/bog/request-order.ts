"use server";

type BasketItem = {
  quantity: number;
  unit_price: number;
  product_id: string;
};

type PurchaseUnits = {
  currency: string;
  total_amount: number;
  basket: BasketItem[];
};

type RedirectUrls = {
  fail: string;
  success: string;
};

type OrderRequest = {
  callback_url: string;
  external_order_id: string;
  purchase_units: PurchaseUnits;
  redirect_urls: RedirectUrls;
};

type OrderLinks = {
  details: {
    href: string;
  };
  redirect: {
    href: string;
  };
};

type OrderResponse = {
  id: string;
  _links: OrderLinks;
  success: true;
};

type ErrorResponse = {
  success: false;
};

export default async function createOrder(
  token: string,
  orderRequest: OrderRequest
): Promise<OrderResponse | ErrorResponse> {
  const url = "https://api.bog.ge/payments/v1/ecommerce/orders";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Accept-Language": "ka",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...orderRequest }),
    });

    if (!response.ok) {
      return {
        success: false,
      };
    }

    const data: OrderResponse = await response.json();
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
