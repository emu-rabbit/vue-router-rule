const defaultOption = {
    debugInfo: false
};
export function defineRule(router, rules, options = {}) {
    router.beforeEach(async (to, from, next) => {
        options = { ...defaultOption, ...options };
        const context = {}; // initialize context
        // Loop the rules
        let isBeenHandled = false;
        for (let i = 0; i <= rules.length - 1; i++) {
            const rule = rules[i];
            isBeenHandled = await rule.exec({ to, from, context }, next);
            if (options.debugInfo)
                logInfo(rule, i, { to, from });
            if (isBeenHandled)
                break;
        }
        if (!isBeenHandled)
            next(); // Fallback to accept all route
    });
}
const logInfo = (rule, index, env) => {
    console.info(`%cRule accepted at index "${index}" from "${env.from.path}" to "${env.to.path}"\n%cRemark: ${rule.remark}`, 'font-size: larger', 'font-size: normal');
};
