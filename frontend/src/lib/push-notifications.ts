"use server";

import webpush from "web-push";
import { getUser } from "./utils/auth";

webpush.setVapidDetails(
    "https://hoppla.ge",
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!
);

type EnhancedPushSubscriptionJSON = {
    createdAt: string;
} & PushSubscriptionJSON;
declare global {
    var subscriptions: Record<string, EnhancedPushSubscriptionJSON[]>;
    var userHasSubscription: Record<string, boolean>;
}

let subscriptions: Record<string, EnhancedPushSubscriptionJSON[]> =
    global.subscriptions || {};

if (process.env.NODE_ENV === "development") {
    global.subscriptions = subscriptions;
}

let userHasSubscription: Record<string, boolean> =
    global.userHasSubscription || {};

export async function doesUserHasSubscription(userId: string) {
    return { hasSubscription: userHasSubscription[userId] };
}

export async function subscribeUser(sub: PushSubscriptionJSON) {
    const user = await getUser();
    if (user) {
        const userSubscriptions = subscriptions[user.id] || [];
        if (!userHasSubscription[user.id]) {
            userHasSubscription[user.id] = true;
        }
        const isAlreadySubscribed = userSubscriptions.some(
            (existingSub) => existingSub.endpoint === sub.endpoint
        );

        if (!isAlreadySubscribed) {
            userSubscriptions.push({
                ...sub,
                createdAt: new Date().toISOString(),
            });
            subscriptions[user.id] = userSubscriptions;
        }
    }
    return { success: true };
}

export async function unsubscribeUser() {
    const user = await getUser();
    if (user) {
        subscriptions[user.id] = [];
    }
    return { success: true };
}

export async function sendNotification(userId: string, message: string) {
    console.log(subscriptions[userId]);
    for (const subscription of subscriptions[userId] || []) {
        try {
            await webpush.sendNotification(
                subscription as any,
                JSON.stringify({
                    title: "Test Notification",
                    body: message,
                    icon: "/favicon-48x48.png",
                    url: "https://hoppla.ge",
                })
            );
        } catch (error) {
            //    TODO: error
        }
    }
    return { success: true };
}
