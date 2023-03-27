import { RouterRuleBus } from "./RouterRuleBus";
const defaultOption = {
    debugInfo: false
};
export function defineRule(router, rules, options = {}) {
    const bus = new RouterRuleBus();
    router.beforeEach(async (to, from, next) => {
        options = { ...defaultOption, ...options };
        const context = {}; // initialize context
        const store = [];
        // Loop the rules
        let isBeenHandled = false;
        for (let i = 0; i <= rules.length - 1; i++) {
            const rule = rules[i];
            // Execute results
            const executeResult = await rule.exec({ to, from, context }, next, store);
            isBeenHandled = executeResult.isBeenHandled;
            const nextParam = executeResult.nextParams;
            if (isBeenHandled && nextParam !== null) {
                if (options.debugInfo)
                    logInfo(rule, i, { to, from });
                // Emit events
                bus.emit('rule-resolve', { from, to, context, nextParam });
                switch (nextParam) {
                    case undefined:
                    case true:
                        bus.emit('rule-accept', { from, to, context });
                        break;
                    case false:
                        bus.emit('rule-deny', { from, to, context });
                        break;
                    default:
                        bus.emit('rule-redirect', { from, to, context, nextParam });
                }
                break;
            }
        }
        // Fallback to accept all route
        if (!isBeenHandled) {
            bus.emit('no-rule-match', { from, to, context });
            next();
        }
    });
    return { bus };
}
const logInfo = (rule, index, env) => {
    console.info(`%cRule accepted at index "${index}" from "${env.from.path}" to "${env.to.path}"\n%cRemark: ${rule.remark}`, 'font-size: larger', 'font-size: normal');
};
