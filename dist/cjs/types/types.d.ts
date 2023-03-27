import type { RouteLocation, NavigationGuardNext, RouteLocationRaw } from "vue-router";
import type { ComponentPublicInstance } from "vue";
export interface DefineRuleOptions {
    debugInfo: boolean;
}
export interface GuardEnvironment {
    to: RouteLocation;
    from: RouteLocation;
}
export interface ExecutionEnvironment<ContextType> extends GuardEnvironment {
    context: ContextType;
}
export type LocationConstraint = string | RegExp | ((location: RouteLocation) => Boolean);
export type StoreKey = string | Symbol;
export type NavigationGuardNextParams = undefined | Error | RouteLocationRaw | boolean | ((vm: ComponentPublicInstance) => any);
export interface RuleExecuteResult {
    isBeenHandled: boolean;
    nextParams: NavigationGuardNextParams | null;
}
export interface RouterRule<T> {
    remark?: string;
    exec: (context: ExecutionEnvironment<T>, next: NavigationGuardNext, store: StoreKey[]) => Promise<RuleExecuteResult>;
}
type BusEventPayloadBase<ContextType> = {
    from: RouteLocation;
    to: RouteLocation;
    context: ContextType;
};
type BusEventPayloadWithParam<ContextType> = {
    nextParam: NavigationGuardNextParams;
} & BusEventPayloadBase<ContextType>;
type BusEventMap<ContextType> = {
    'rule-resolve': BusEventPayloadWithParam<ContextType>;
    'rule-accept': BusEventPayloadBase<ContextType>;
    'rule-deny': BusEventPayloadBase<ContextType>;
    'rule-redirect': BusEventPayloadWithParam<ContextType>;
    'no-rule-match': BusEventPayloadBase<ContextType>;
};
export type BusEventName<C> = keyof BusEventMap<C>;
export type BusEventPayload<C, T extends BusEventName<C>> = BusEventMap<C>[T];
export type BusEventListener<C, T extends BusEventName<C>> = (param: BusEventPayload<C, T>) => void;
export type Awaitable<T> = T | Promise<T>;
export {};
//# sourceMappingURL=types.d.ts.map