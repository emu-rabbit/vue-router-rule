import type { NavigationGuardNext, RouteLocationRaw } from "vue-router"
import type { Awaitable, Condition, ExecutionEnvironment, LocationConstraint, NavigationGuardNextParams, RouterRule } from "./types"
import { matchConstraint } from "./utils/match"

const RuleBuilderStore = new Map<(string | Symbol), RouterRuleBuilder<unknown>>()
export class RouterRuleBuilder<ContextType> {
    private constructor(
        public readonly remark?: string
    ) {}
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
    do(task: (context: ExecutionEnvironment<ContextType>) => void) {
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
    next(nextParamsProvider: (env: ExecutionEnvironment<ContextType>) => Awaitable<NavigationGuardNextParams>): RouterRule<ContextType> {
        return new RouterRuleImpl<ContextType>(this.conditions, nextParamsProvider, this.remark)
    }
    accept() {
        return this.next(() => undefined)
    }
    deny() {
        return this.next(() => false)
    }
    redirect(location: RouteLocationRaw | ((env: ExecutionEnvironment<ContextType>) => Awaitable<RouteLocationRaw>)) {
        return this.next(async env => {
            if (typeof location === 'function') return await location(env)
            return location
        })
    }
    continue() {
        return this
            .when(() => false) // Set condition to failed then skip this rule
            .accept()
    }

    // Statics
    static create<S>() {
        return (remark?: string) => new RouterRuleBuilder<S>(remark)
    }
}

class RouterRuleImpl<T> {
    constructor(
        private conditions: Condition<T>[],
        private nextParamsProvider: (environment: ExecutionEnvironment<T>) => Awaitable<NavigationGuardNextParams>,
        public readonly remark?: string
    ) {}

    async exec(environment: ExecutionEnvironment<T>, next: NavigationGuardNext): Promise<boolean> {
        for (const condition of this.conditions) {
            if (!(await condition(environment))) return false
        }
        const params = await this.nextParamsProvider(environment)
        next(params as any)
        return true
    }
}
