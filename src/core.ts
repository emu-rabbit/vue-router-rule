import type { Router } from "vue-router"
import { RouterRuleBus } from "./RouterRuleBus"
import type { DefineRuleOptions, GuardEnvironment, NavigationGuardNextParams, RouterRule, StoreKey } from "./types"

const defaultOption: DefineRuleOptions = {
    debugInfo: false
}

export function defineRule<ContextType extends Object = any>(
    router: Router,
    rules: RouterRule<ContextType>[],
    options: Partial<DefineRuleOptions> = {}
) {
    const bus = new RouterRuleBus<ContextType>()
    router.beforeEach(
        async (to, from, next) => {
            options = { ...defaultOption, ...options }
            const context = {} as ContextType // initialize context
            const store: StoreKey[] = []

            // Loop the rules
            let isBeenHandled = false
            for (let i = 0; i <= rules.length - 1; i ++) {
                const rule = rules[i]

                // Execute results
                const executeResult = await rule.exec({ to, from, context }, next, store)
                isBeenHandled = executeResult.isBeenHandled
                const nextParam = executeResult.nextParams

                if (isBeenHandled && nextParam !== null) {
                    const { remark } = rule
                    if (options.debugInfo) logInfo(rule, i, { to, from })

                    // Emit events
                    bus.emit('rule-resolve', { from, to, context, index: i, remark, nextParam })
                    switch(nextParam) {
                        case undefined:
                        case true:
                            bus.emit('rule-accept', { from, to, context, index: i, remark })
                            break
                        case false:
                            bus.emit('rule-deny', { from, to, context, index: i, remark })
                            break
                        default:
                            bus.emit('rule-redirect', { from, to, context, index: i, remark, nextParam })
                    }
                    break
                }
            }
            
            // Fallback to accept all route
            if (!isBeenHandled) {
                bus.emit('no-rule-match', { from, to, context })
                next()
            }
        }
    )
    return { bus }
}

const logInfo = (rule: RouterRule<any>, index: number, env: GuardEnvironment) => {
    console.info(
        `%cRule accepted at index "${index}" from "${env.from.path}" to "${env.to.path}"\n%cRemark: ${rule.remark}`,
        'font-size: larger',
        'font-size: normal'
    )
}