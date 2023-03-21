import type { RouteLocation, Router } from "vue-router"
import type { RouterRule } from "./types"

export { RouterRuleBuilder } from "./RouterRule"
export function defineRule<ContextType>(
    router: Router,
    rules: RouterRule<ContextType>[],
    initialContext?: (location: { to: RouteLocation, from: RouteLocation }) => (ContextType | Promise<ContextType>)
) {
    router.beforeEach(
        async (to, from, next) => {

            let isBeenHandled = false

            const context = initialContext ? await initialContext({ to, from }) : undefined as ContextType // initialize context

            // Loop the rules
            for (let i = 0; i <= rules.length - 1; i ++) {
                const rule = rules[i]
                if (await rule.exec({ to, from, context }, next)){
                    console.info(`Rule ${ rule.remark } at index ${i} accepted from ${from.path} to ${ to.path }`)
                    isBeenHandled = true
                }
                if (isBeenHandled) break
            }
            if (!isBeenHandled) next() // Fallback to accept all route
        }
    )
}
