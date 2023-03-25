import type { RouteLocationRaw } from "vue-router";
import type { Awaitable, Condition, ExecutionEnvironment, LocationConstraint, NavigationGuardNextParams, RouterRule } from "./types";
export declare class RouterRuleBuilder<ContextType> {
    readonly remark?: string | undefined;
    private constructor();
    private conditions;
    when(condition: Condition<ContextType>): this;
    to(constraint: LocationConstraint | LocationConstraint[]): this;
    from(constraint: LocationConstraint | LocationConstraint[]): this;
    withContext(constraint: (context: ContextType) => unknown): this;
    any(): this;
    do(task: (context: ExecutionEnvironment<ContextType>) => void): this;
    save(key: string | Symbol): this;
    load(key: string | Symbol): this;
    next(nextParamsProvider: (env: ExecutionEnvironment<ContextType>) => Awaitable<NavigationGuardNextParams>): RouterRule<ContextType>;
    accept(): RouterRule<ContextType>;
    deny(): RouterRule<ContextType>;
    redirect(location: RouteLocationRaw | ((env: ExecutionEnvironment<ContextType>) => Awaitable<RouteLocationRaw>)): RouterRule<ContextType>;
    continue(): RouterRule<ContextType>;
    static create<S>(): (remark?: string) => RouterRuleBuilder<S>;
}
//# sourceMappingURL=RouterRule.d.ts.map