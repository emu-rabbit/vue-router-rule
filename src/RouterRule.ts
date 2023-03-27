import type { NavigationGuardNext, RouteLocationRaw } from "vue-router"
import type { Awaitable, ExecutionEnvironment, LocationConstraint, NavigationGuardNextParams, RouterRule, RuleExecuteResult, StoreKey } from "./types"
import { matchConstraint } from "./utils/match"

export class RouterRuleBuilder<ContextType> {
    private constructor(
        public readonly remark?: string
    ) {}
    private commands: Command<ContextType>[] = []
    
    // Conditions
    when(condition: (context: ExecutionEnvironment<ContextType>) => unknown): this { 
        this.commands.push({
            type: 'condition',
            condition
        })
        return this
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
        this.commands.push({
            type: 'task',
            task
        })
        return this
    }

    // Store
    save(key: StoreKey) {
        this.commands.push({
            type: 'store',
            action: 'save',
            key
        })
        return this
    }
    load(key: StoreKey) {
        this.commands.push({
            type: 'store',
            action: 'load',
            key
        })
        return this
    }

    // Navigates
    next(nextParamProvider: NextParamProvider<ContextType>): RouterRule<ContextType> {
        this.commands.push({
            type: 'next',
            paramProvider: nextParamProvider
        })
        return new RouterRuleImpl<ContextType>(this.commands, this.remark)
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
        private commands: Command<T>[],
        public readonly remark?: string
    ) {}

    async exec(environment: ExecutionEnvironment<T>, next: NavigationGuardNext, store: StoreKey[]): Promise<RuleExecuteResult> {
        for (const command of this.commands) {
            switch (command.type) {
                case 'condition':
                    if (!(await command.condition(environment))) return { isBeenHandled: false, nextParams: null }
                    break
                case 'task':
                    await command.task(environment)
                    break
                case 'store':
                    if (command.action === 'save') {
                        store.push(command.key)
                    } else {
                        if (!store.includes(command.key)) return { isBeenHandled: false, nextParams: null }
                    }
                    break
                case 'next':
                    const params = await command.paramProvider(environment)
                    next(params as any)
                    return { isBeenHandled: true, nextParams: params }
            }
        }
        throw Error('Rule lack of an result')
    }
}

type Condition<T> = (context: ExecutionEnvironment<T>) => unknown
type Task<T> = (context: ExecutionEnvironment<T>) => void
type NextParamProvider<T> = (env: ExecutionEnvironment<T>) => Awaitable<NavigationGuardNextParams>

type Command<T> = ConditionCommand<T> | TaskCommand<T> | StoreCommand | NextCommand<T>
type ConditionCommand<T> = {
    type: 'condition',
    condition: Condition<T>
}
type TaskCommand<T> = {
    type: 'task',
    task: Task<T>
}
type StoreCommand = {
    type: 'store',
    action: 'save' | 'load',
    key: StoreKey
}
type NextCommand<T> = {
    type: 'next',
    paramProvider: NextParamProvider<T>
}