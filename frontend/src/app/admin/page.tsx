"use client";

import { Button } from "@/components/ui/button";
import { usePushNotification } from "@/lib/providers/push-notification-provider";
import { sendNotification } from "@/lib/push-notifications";

export default function Page() {
    const {
        isLoaded,
        hasUserSubscription,
        isSupported,
        isLoading,
        getNotificationPermission,
        subscribeToPush,
        unsubscribeFromPush,
    } = usePushNotification();

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    if (!isSupported) {
        return <div>Push notifications are not supported in your browser.</div>;
    }

    if (getNotificationPermission() === "denied") {
        return (
            <div>
                Push notifications are blocked in your browser. Please enable
                them to use this feature.
            </div>
        );
    }

    return (
        <div className="min-h-screen font-sans antialiased bg-gray-100">
            <div>
                <h3>Push Notifications</h3>
                {hasUserSubscription ? (
                    <>
                        <p>You are subscribed to push notifications.</p>
                        <Button
                            disabled={isLoading}
                            onClick={unsubscribeFromPush}
                        >
                            Unsubscribe
                        </Button>
                    </>
                ) : (
                    <>
                        <p>You are not subscribed to push notifications.</p>
                        <Button disabled={isLoading} onClick={subscribeToPush}>
                            Subscribe
                        </Button>
                    </>
                )}
            </div>
            <div>
                <h3>Send some push notification to other person</h3>
                <h3>Format is: user_id:text that you want</h3>
                <input
                    type="text"
                    defaultValue={
                        "cm1kwch1b0002oek0odo0pwnf:dude, you are awesome!"
                    }
                    className="w-full p-4"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            const target = e.target as HTMLInputElement;
                            let [userId, text] = target.value.split(":");
                            userId = userId.trim();
                            text = text.trim();

                            if (!userId || !text) {
                                return;
                            }

                            sendNotification(userId, text);
                        }
                    }}
                />
            </div>
        </div>
    );
}
