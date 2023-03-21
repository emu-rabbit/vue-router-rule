import type { RouteLocation } from "vue-router";
import type { LocationConstraint } from "../types";

export const matchConstraint = (constraint: LocationConstraint, location: RouteLocation) => {
    if (typeof constraint === 'string') return constraint === location.path
    if (constraint instanceof RegExp) return constraint.test(location.path)
    return constraint(location)
}