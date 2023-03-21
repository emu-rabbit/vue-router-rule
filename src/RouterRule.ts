import type { NavigationGuardNext, RouteLocationRaw } from "vue-router"
import type { Condition, ConditionParams, LocationConstraint, NavigationGuardNextParams, RouterRule } from "./types"
import { matchConstraint } from "./utils/match"

const RuleBuilderStore = new Map<(string | Symbol), RouterRuleBuilder<unknown>>()
export class RouterRuleBuilder<ContextType> {
    private constructor() {}
    private conditions: Condition<ContextType>[] = []
    
    // Conditions
    when(condition: Condition<ContextType>): this { 
        return this.conditions.push(condition), this
    }
    to(constraint: LocationConstraint | LocationConstraint[]) {
        return this.when(
            ({ to }) => (Array.isArray(constraint) ? constraint : [constraint]).some(c => matchConstraint(c, to))
        )
    }
    from(constraint: LocationConstraint | LocationConstraint[]) {
        return this.when(
            ({ from }) => (Array.isArray(constraint) ? constraint : [constraint]).some(c => matchConstraint(c, from))
        )
    }
    withContext(constraint: (context: ContextType) => unknown) {
        return this.when(
            ({ context }) => constraint(context)
        )
    }
    any(){
        return this.when(() => true)
    }

    // Utils
    do(task: (context: ConditionParams<ContextType>) => void) {
        return this.when(
            async context => (await task(context), true)
        )
    }

    // Store
    save(key: string | Symbol) {
        const newBuilder = new RouterRuleBuilder<ContextType>()
        newBuilder.conditions = [...this.conditions]
        RuleBuilderStore.set(key, newBuilder as RouterRuleBuilder<unknown>)
        return this
    }
    load(key: string | Symbol) {
        const storeBuilder = RuleBuilderStore.get(key)
        if (storeBuilder) {
            this.conditions = [...storeBuilder.conditions]
        }
        return this
    }

    // Navigates
    next(result?: NavigationGuardNextParams): RouterRule<ContextType> {
        return new RouterRuleImpl<ContextType>(this.conditions, result)
    }
    accept() {
        return this.next()
    }
    deny() {
        return this.next(false)
    }
    redirect(location: RouteLocationRaw) {
        return this.next(location)
    }
    continue() {
        return this
            .when(() => false) // Set condition to failed then skip this rule
            .next()
    }

    // Statics
    static create<S>() {
        return () => new RouterRuleBuilder<S>()
    }
}

class RouterRuleImpl<T> {
    constructor(
        private conditions: Condition<T>[],
        private result?: NavigationGuardNextParams
    ) {}

    async exec(context: ConditionParams<T>, next: NavigationGuardNext): Promise<boolean> {
        for (const condition of this.conditions) {
            if (!(await condition(context))) return false
        }
        next(this.result as any)
        return true
    }
}
