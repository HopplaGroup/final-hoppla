"use server";

import { menv } from "../utils/menv";

type TokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  success: true;
};

type ErrorResponse = {
  success: false;
};

export default async function getToken(): Promise<
  TokenResponse | ErrorResponse
> {
  const url =
    "https://oauth2.bog.ge/auth/realms/bog/protocol/openid-connect/token";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(
            `${menv.BOG_CLIENT_ID}:${menv.BOG_CLIENT_SECRET}`
          ).toString("base64"),
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
      }),
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
