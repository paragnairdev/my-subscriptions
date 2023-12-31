import { SUBSCRIPTION_TYPES } from "./dataService";

export const calculateSubscriptionCost = (sub, calculatePerMonth) => {
    // if calculatePerMonth is true, then we need to divide yearly subscriptions by 12
    return calculatePerMonth 
        ? parseFloat(
            sub.type === SUBSCRIPTION_TYPES.YEARLY ? parseFloat(sub.amount) / 12 : parseFloat(sub.amount)
        ) 
        // otherwise, we need to multiply monthly subscriptions by 12
        : parseFloat(
            sub.type === SUBSCRIPTION_TYPES.YEARLY ? parseFloat(sub.amount) : parseFloat(sub.amount) * 12
        );
};