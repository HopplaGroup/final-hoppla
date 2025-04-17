"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import {
    doesUserHasSubscription,
    sendNotification,
    subscribeUser,
    unsubscribeUser,
} from "@/lib/push-notifications";
import { useUser } from "@/lib/providers/UserProvider";
import toast from "react-hot-toast";
import { Bell, X } from "lucide-react";
import { menv } from "../utils/menv";

interface PushNotificationContextProps {
    isSupported: boolean;
    hasUserSubscription: boolean;
    getNotificationPermission: () => NotificationPermission;
    subscribeToPush: () => Promise<void>;
    unsubscribeFromPush: () => Promise<void>;
    showSubscribeToast: () => void;
    isLoaded: boolean;
    isLoading: boolean;
}

const PushNotificationContext = createContext<
    PushNotificationContextProps | undefined
>(undefined);

export default function PushNotificationProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [isSupported, setIsSupported] = useState(false);
    const [hasUserSubscription, setHasUserSubscription] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useUser();
    const getNotificationPermission = () =>
        typeof Notification !== "undefined"
            ? Notification.permission
            : "default";

    useEffect(() => {
        setIsLoaded(false);
        setIsLoading(true);
        if ("serviceWorker" in navigator && "PushManager" in window) {
            setIsSupported(true);
            registerServiceWorker();
        }
    }, []);

    async function registerServiceWorker() {
        const registration = await navigator.serviceWorker.register("/sw.js", {
            scope: "/",
            updateViaCache: "none",
        });
        if (!user) return;
        const clientSub = await registration.pushManager.getSubscription();
        const userHasSubscription = await doesUserHasSubscription(user.id);

        if (getNotificationPermission() === "denied") {
            if (clientSub) {
                await clientSub.unsubscribe();
            }
            setHasUserSubscription(userHasSubscription.hasSubscription);
            setIsLoaded(true);
            setIsLoading(false);
            return;
        }

        if (clientSub && !userHasSubscription.hasSubscription) {
            await clientSub.unsubscribe();
        } else if (!clientSub && userHasSubscription.hasSubscription) {
            try {
                const sub = await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(
                        menv.NEXT_PUBLIC_VAPID_PUBLIC_KEY
                    ),
                });
                await subscribeUser(sub.toJSON());
            } catch (error) {
                setHasUserSubscription(userHasSubscription.hasSubscription);
                setIsLoaded(true);
                setIsLoading(false);
                console.log(
                    Notification.permission,
                    getNotificationPermission()
                );
                return;
            }
        } else if (clientSub && userHasSubscription.hasSubscription) {
            await subscribeUser(clientSub.toJSON());
        }
        setHasUserSubscription(userHasSubscription.hasSubscription);
        setIsLoaded(true);
        setIsLoading(false);
    }

    async function subscribeToPush() {
        if (!isLoaded) return;
        setIsLoading(true);
        const registration = await navigator.serviceWorker.ready;
        let sub;
        try {
            sub = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(
                    menv.NEXT_PUBLIC_VAPID_PUBLIC_KEY
                ),
            });
        } catch (error) {
            console.error("Error subscribing to push notifications", error);
            setIsLoading(false);
            return;
        }

        await subscribeUser(sub.toJSON());
        setHasUserSubscription(true);
        toast.success("Subscribed to push notifications");
        setIsLoading(false);
    }

    async function unsubscribeFromPush() {
        if (!isLoaded) return;
        setIsLoading(true);
        const registration = await navigator.serviceWorker.ready;
        const sub = await registration.pushManager.getSubscription();
        if (sub) {
            await sub.unsubscribe();
        }
        await unsubscribeUser();
        setHasUserSubscription(false);
        toast.success("Unsubscribed from push notifications");
        setIsLoading(false);
    }

    function showSubscribeToast() {
        if (!isLoaded) return;
        toast.custom((t) => (
            <div
                id="toast-interactive"
                className="w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-400"
                role="alert"
            >
                <div className="flex">
                    <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-primary bg-primary/5 rounded-lg">
                        <Bell size={16} />
                        <span className="sr-only">Refresh icon</span>
                    </div>
                    <div className="ms-3 text-sm font-normal">
                        <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                            Get the notifications
                        </span>
                        <div className="mb-2 text-sm font-normal">
                            Get notified about your rides and other important
                            updates.
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <button
                                    onClick={() => {
                                        subscribeToPush();
                                        toast.dismiss(t.id);
                                        toast.success(
                                            "Subscribed to push notifications"
                                        );
                                    }}
                                    className="inline-flex justify-center w-full px-2 py-2 text-xs font-medium text-center text-white bg-primary rounded-lg hover:bg-primary/80 focus:ring-4 focus:outline-none focus:ring-blue-300"
                                >
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="ms-auto -mx-1.5 -my-1.5 bg-white items-center justify-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 "
                        data-dismiss-target="#toast-interactive"
                        aria-label="Close"
                        onClick={() => toast.dismiss(t.id)}
                    >
                        <span className="sr-only">Close</span>
                        <X size={16} />
                    </button>
                </div>
            </div>
        ));
    }

    return (
        <PushNotificationContext.Provider
            value={{
                isSupported,
                hasUserSubscription,
                subscribeToPush,
                unsubscribeFromPush,
                showSubscribeToast,
                isLoaded,
                isLoading,
                getNotificationPermission,
            }}
        >
            {children}
        </PushNotificationContext.Provider>
    );
}

export function usePushNotification() {
    const context = useContext(PushNotificationContext);
    if (!context) {
        throw new Error(
            "usePushNotification must be used within a PushNotificationProvider"
        );
    }
    return context;
}

function urlBase64ToUint8Array(base64String: string) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, "+")
        .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
