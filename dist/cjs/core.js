"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineRule = void 0;
const RouterRuleBus_1 = require("./RouterRuleBus");
const defaultOption = {
    debugInfo: false
};
function defineRule(router, rules, options = {}) {
    const bus = new RouterRuleBus_1.RouterRuleBus();
    router.beforeEach((to, from, next) => __awaiter(this, void 0, void 0, function* () {
        options = Object.assign(Object.assign({}, defaultOption), options);
        const context = {}; // initialize context
        const store = [];
        // Loop the rules
        let isBeenHandled = false;
        for (let i = 0; i <= rules.length - 1; i++) {
            const rule = rules[i];
            // Execute results
            const executeResult = yield rule.exec({ to, from, context }, next, store);
            isBeenHandled = executeResult.isBeenHandled;
            const nextParam = executeResult.nextParams;
            if (isBeenHandled && nextParam !== null) {
                const { remark } = rule;
                if (options.debugInfo)
                    logInfo(rule, i, { to, from });
                // Emit events
                bus.emit('rule-resolve', { from, to, context, index: i, remark, nextParam });
                switch (nextParam) {
                    case undefined:
                    case true:
                        bus.emit('rule-accept', { from, to, context, index: i, remark });
                        break;
                    case false:
                        bus.emit('rule-deny', { from, to, context, index: i, remark });
                        break;
                    default:
                        bus.emit('rule-redirect', { from, to, context, index: i, remark, nextParam });
                }
                break;
            }
        }
        // Fallback to accept all route
        if (!isBeenHandled) {
            bus.emit('no-rule-match', { from, to, context });
            next();
        }
    }));
    return { bus };
}
exports.defineRule = defineRule;
const logInfo = (rule, index, env) => {
    console.info(`%cRule accepted at index "${index}" from "${env.from.path}" to "${env.to.path}"\n%cRemark: ${rule.remark}`, 'font-size: larger', 'font-size: normal');
};
