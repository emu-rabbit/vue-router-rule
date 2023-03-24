import type { Router } from "vue-router"
import type { Awaitable, DefineRuleOptions, GuardEnvironment, RouterRule } from "./types"

const defaultOption: DefineRuleOptions = {
    debugInfo: false
}

export function defineRule<ContextType extends Object = any>(
    router: Router,
    rules: RouterRule<ContextType>[],
    options: Partial<DefineRuleOptions> = {}
) {
    router.beforeEach(
        async (to, from, next) => {
            options = { ...defaultOption, ...options }
            const context = {} as ContextType // initialize context

            // Loop the rules
            let isBeenHandled = false
            for (let i = 0; i <= rules.length - 1; i ++) {
                const rule = rules[i]
                isBeenHandled = await rule.exec({ to, from, context }, next)
                if (options.debugInfo) console.info(`Rule ${ rule.remark } at index ${i} accepted from ${from.path} to ${ to.path }`)
                if (isBeenHandled) break
            }
            if (!isBeenHandled) next() // Fallback to accept all route
        }
    )
}
