import type { RouteLocationRaw } from "vue-router";
import type { Awaitable, ExecutionEnvironment, LocationConstraint, NavigationGuardNextParams, RouterRule, StoreKey } from "./types";
export declare class RouterRuleBuilder<ContextType> {
    readonly remark?: string | undefined;
    private constructor();
    private commands;
    when(condition: (context: ExecutionEnvironment<ContextType>) => unknown): this;
    to(constraint: LocationConstraint | LocationConstraint[]): this;
    from(constraint: LocationConstraint | LocationConstraint[]): this;
    withContext(constraint: (context: ContextType) => unknown): this;
    any(): this;
    do(task: (context: ExecutionEnvironment<ContextType>) => void): this;
    save(key: StoreKey): this;
    load(key: StoreKey): this;
    next(nextParamProvider: NextParamProvider<ContextType>): RouterRule<ContextType>;
    accept(): RouterRule<ContextType>;
    deny(): RouterRule<ContextType>;
    redirect(location: RouteLocationRaw | ((env: ExecutionEnvironment<ContextType>) => Awaitable<RouteLocationRaw>)): RouterRule<ContextType>;
    continue(): RouterRule<ContextType>;
    static create<S>(): (remark?: string) => RouterRuleBuilder<S>;
}
type NextParamProvider<T> = (env: ExecutionEnvironment<T>) => Awaitable<NavigationGuardNextParams>;
export {};
//# sourceMappingURL=RouterRule.d.ts.map