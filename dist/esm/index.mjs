export { RouterRuleBuilder } from "./RouterRule";
export function defineRule(router, rules, initialContext) {
    router.beforeEach(async (to, from, next) => {
        let isBeenHandled = false;
        const context = initialContext ? await initialContext({ to, from }) : undefined; // initialize context
        // Loop the rules
        for (let i = 0; i <= rules.length - 1; i++) {
            const rule = rules[i];
            if (await rule.exec({ to, from, context }, next)) {
                console.info(`Rule ${i} accepted from ${from.path} to ${to.path}`);
                isBeenHandled = true;
            }
            if (isBeenHandled)
                break;
        }
        if (!isBeenHandled)
            next(); // Fallback to accept all route
    });
}
