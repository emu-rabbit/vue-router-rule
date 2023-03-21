import type { RouteLocation, NavigationGuardNext, RouteLocationRaw } from "vue-router"
import type { ComponentPublicInstance } from "vue"

export type ConditionParams<ContextType> = {
    to: RouteLocation,
    from: RouteLocation,
    context: ContextType
}
export type Condition<T> = (context: ConditionParams<T>) => unknown

export type LocationConstraint = string | RegExp | ((location: RouteLocation) => Boolean)
export type NavigationGuardNextParams = Error | RouteLocationRaw | boolean | ((vm: ComponentPublicInstance) => any)

export interface RouterRule<T> {
    remark?: string,
    exec: (context: ConditionParams<T>, next: NavigationGuardNext) => Promise<boolean>
}