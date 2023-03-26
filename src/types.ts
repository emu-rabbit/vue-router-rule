import type { RouteLocation, NavigationGuardNext, RouteLocationRaw } from "vue-router"
import type { ComponentPublicInstance } from "vue"

export interface DefineRuleOptions {
    debugInfo: boolean
}
export interface GuardEnvironment {
    to: RouteLocation,
    from: RouteLocation
}
export interface ExecutionEnvironment<ContextType> extends GuardEnvironment {
    context: ContextType
}

export type LocationConstraint = string | RegExp | ((location: RouteLocation) => Boolean)
export type StoreKey = string | Symbol
export type NavigationGuardNextParams = undefined | Error | RouteLocationRaw | boolean | ((vm: ComponentPublicInstance) => any)

export interface RouterRule<T> {
    remark?: string,
    exec: (context: ExecutionEnvironment<T>, next: NavigationGuardNext, store: StoreKey[]) => Promise<boolean>
}

// Utils
export type Awaitable<T> = T | Promise<T>