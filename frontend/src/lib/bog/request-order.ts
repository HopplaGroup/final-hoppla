import "server-only";

import getToken from "./get-token";

type PaymentConfig = {
    loan?: {
        type?: string;
        month?: number;
    };
    campaign?: {
        card?: "visa" | "mc" | "solo";
        type?: "restrict" | "client_discount";
    };
    google_pay?: {
        google_pay_token?: string;
        external?: boolean; // true for business' webpage, false for bank's webpage
    };
    apple_pay?: {
        external?: boolean; // true for business' webpage, false for bank's webpage
    };
    account?: {
        tag?: string; // E-commerce POS identifier
    };
};

type PurchaseUnits = {
    basket: {
        product_id: string;
        description?: string;
        quantity: number;
        unit_price: number;
        unit_discount_price?: number;
        vat?: number;
        vat_percent?: number;
        total_price?: number;
        image?: string;
        package_code?: string;
        tin?: string;
        pinfl?: string;
        product_discount_id?: string;
    }[];
    delivery?: {
        amount?: number;
    };
    total_amount: number;
    total_discount_amount?: number;
    currency?: "GEL" | "USD" | "EUR" | "GBP";
};

type RedirectUrls = {
    fail?: string;
    success?: string;
};

type OrderRequest = {
    application_type?: "web" | "mobile";
    buyer?: {
        full_name: string;
        masked_email: string;
        masked_phone: string;
    };
    callback_url: string;
    external_order_id?: string;
    capture?: "automatic" | "manual";
    purchase_units: PurchaseUnits;
    redirect_urls?: RedirectUrls;
    ttl?: number; // in minutes xD
    payment_method?: (
        | "card"
        | "google_pay"
        | "apple_pay"
        | "bog_p2p"
        | "bog_loyalty"
        | "bnpl"
        | "bog_loan"
        | "gift_card"
    )[];
    config?: PaymentConfig;
};

type OrderResponse = {
    id: string;
    _links: {
        details: {
            href: string;
        };
        redirect: {
            href: string;
        };
    };
    success: true;
};

type ErrorResponse = {
    success: false;
};

export default async function requestOrder(
    orderRequest: OrderRequest,
    lang: "ka" | "en" = "ka",
    theme: "light" | "dark" = "light"
): Promise<OrderResponse | ErrorResponse> {
    const url = "https://api.bog.ge/payments/v1/ecommerce/orders";
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
                "Accept-Language": lang,
                Theme: theme,
                Authorization: `Bearer ${tokenResponse.access_token}`,
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
