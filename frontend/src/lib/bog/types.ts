export type PaymentDetailsResponse = {
    order_id: string;
    industry: string;
    capture: "automatic" | "manual";
    external_order_id: string;
    client: {
        id: string;
        brand_ka: string;
        brand_en: string;
        url: string;
    };
    zoned_create_date: string;
    zoned_expire_date: string;
    order_status: {
        key:
            | "created"
            | "processing"
            | "completed"
            | "rejected"
            | "refund_requested"
            | "refunded"
            | "refunded_partially"
            | "auth_requested"
            | "blocked"
            | "partial_completed";
        value: string;
    };
    buyer: {
        full_name: string;
        email: string;
        phone_number: string;
    };
    purchase_units: {
        request_amount: string;
        transfer_amount: string;
        refund_amount: string;
        currency_code: string;
        items: {
            external_item_id: string;
            description: string;
            quantity: string;
            unit_price: string;
            unit_discount_price: string;
            vat: string;
            vat_percent: string;
            total_price: string;
            package_code: string;
            tin: string;
            pinfl: string;
        }[];
        basket?: {
            product_discount_id?: string;
        }[];
    };
    redirect_links: {
        fail: string;
        success: string;
    };
    payment_detail: {
        transfer_method: {
            key:
                | "card"
                | "google_pay"
                | "apple_pay"
                | "bog_p2p"
                | "bog_loyalty"
                | "bnpl"
                | "bog_loan";
            value: string;
        };
        transaction_id: string;
        payer_identifier: string;
        payment_option: "direct_debit" | "recurrent" | "subscription";
        card_type: "amex" | "mc" | "visa";
        card_expiry_date: string;
        request_account_tag: string;
        transfer_account_tag: string;
        saved_card_type?: "recurrent" | "subscription";
        parent_order_id?: string;
        code: string;
        code_description: string;
    };
    discount?: {
        bank_discount_amount: string;
        bank_discount_desc: string;
        system_discount_amount: string;
        system_discount_desc: string;
        discounted_amount: string;
        original_order_amount: string;
    };
    actions: {
        action_id: string;
        request_channel: "public_api" | "business_manager" | "support";
        action:
            | "authorize"
            | "partial_authorize"
            | "cancel_authorize"
            | "refund"
            | "partial_refund";
        status: "completed" | "rejected";
        zoned_action_date: string;
        amount: string;
    }[];
    lang: "ka" | "en";
    reject_reason?: "expiration" | "unknown";
};
