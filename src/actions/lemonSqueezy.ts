"use server";

import { lemonSqueezyClient } from "@/lib/axios";

export const buySubscription = async (buyerUserId: string) => {
  try {
    const res = await lemonSqueezyClient(
      process.env.LEMON_SQUEEZY_API_KEY
    ).post("checkouts", {
      data: {
        type: "checkouts",
        attributes: {
          checkout_data: {
            custom: {
              buyerUserId: buyerUserId,
            },
          },
          product_options: {
            redirect_url: `${process.env.NEXT_PUBLIC_HOST_URL}/dashboard`,
          },
        },
        relationships: {
          store: {
            data: {
              type: "stores",
              id: process.env.LEMON_SQUEEZY_STORE_ID,
            },
          },
          variant: {
            data: {
              type: "variants",
              id: process.env.LEMON_SQUEEZY_VARIANT_ID,
            },
          },
        },
      },
    });

    const checkoutUrl = res.data.data.attributes.url;
    return { url: checkoutUrl, status: 200 };
  } catch (error) {
    console.error("🔴 ERROR", error);

    return { message: "Internal Server Error", status: 500 };
  }
};
