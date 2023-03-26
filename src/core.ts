import type { Router } from "vue-router"
import type { DefineRuleOptions, GuardEnvironment, RouterRule, StoreKey } from "./types"

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
            const store: StoreKey[] = []

            // Loop the rules
            let isBeenHandled = false
            for (let i = 0; i <= rules.length - 1; i ++) {
                const rule = rules[i]
                isBeenHandled = await rule.exec({ to, from, context }, next, store)
                if (options.debugInfo) logInfo(rule, i, { to, from })
                if (isBeenHandled) break
            }
            if (!isBeenHandled) next() // Fallback to accept all route
        }
    )
}

const logInfo = (rule: RouterRule<any>, index: number, env: GuardEnvironment) => {
    console.info(
        `%cRule accepted at index "${index}" from "${env.from.path}" to "${env.to.path}"\n%cRemark: ${rule.remark}`,
        'font-size: larger',
        'font-size: normal'
    )
}