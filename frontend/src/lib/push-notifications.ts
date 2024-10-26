"use server";

import webpush from "web-push";
import { getUser } from "./utils/auth";
import { menv } from "./utils/menv";

webpush.setVapidDetails(
    "https://hoppla.ge",
    menv.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    menv.VAPID_PRIVATE_KEY
);

// TODO: if there a lot of for exampel 10 for one user then delete the oldest one
// also expired ones should be deleted
// also check if clicks denied then this notification box should be removed and only show that to turn on it from setting of browser
type EnhancedPushSubscriptionJSON = {
    createdAt: string;
} & PushSubscriptionJSON;
declare global {
    var subscriptions: Record<string, EnhancedPushSubscriptionJSON[]>;
    var userHasSubscription: Record<string, boolean>;
}

let subscriptions: Record<string, EnhancedPushSubscriptionJSON[]> =
    global.subscriptions || {};

let userHasSubscription: Record<string, boolean> =
    global.userHasSubscription || {};

if (menv.NODE_ENV === "development") {
    global.subscriptions = subscriptions;
    global.userHasSubscription = userHasSubscription;
}

export async function doesUserHasSubscription(userId: string) {
    return { hasSubscription: !!userHasSubscription[userId] };
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
