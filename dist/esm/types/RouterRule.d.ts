import type { RouteLocationRaw } from "vue-router";
import type { Condition, ConditionParams, LocationConstraint, NavigationGuardNextParams, RouterRule } from "./types";
export declare class RouterRuleBuilder<ContextType> {
    private constructor();
    private conditions;
    when(condition: Condition<ContextType>): this;
    to(constraint: LocationConstraint | LocationConstraint[]): this;
    from(constraint: LocationConstraint | LocationConstraint[]): this;
    withContext(constraint: (context: ContextType) => unknown): this;
    any(): this;
    do(task: (context: ConditionParams<ContextType>) => void): this;
    save(key: string | Symbol): this;
    load(key: string | Symbol): this;
    next(result?: NavigationGuardNextParams): RouterRule<ContextType>;
    accept(): RouterRule<ContextType>;
    deny(): RouterRule<ContextType>;
    redirect(location: RouteLocationRaw): RouterRule<ContextType>;
    continue(): RouterRule<ContextType>;
    static create<S>(): () => RouterRuleBuilder<S>;
}
//# sourceMappingURL=RouterRule.d.ts.map