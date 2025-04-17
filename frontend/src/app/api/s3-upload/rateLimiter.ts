import { RateLimiterMemory } from "rate-limiter-flexible";

export const uploadRateLimiter = new RateLimiterMemory({
    points: 2, // Max 5 uploads
    duration: 60, // Per 60 seconds
});
