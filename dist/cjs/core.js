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
const defaultOption = {
    debugInfo: false
};
function defineRule(router, rules, options = {}) {
    router.beforeEach((to, from, next) => __awaiter(this, void 0, void 0, function* () {
        options = Object.assign(Object.assign({}, defaultOption), options);
        const context = {}; // initialize context
        // Loop the rules
        let isBeenHandled = false;
        for (let i = 0; i <= rules.length - 1; i++) {
            const rule = rules[i];
            isBeenHandled = yield rule.exec({ to, from, context }, next);
            if (options.debugInfo)
                logInfo(rule, i, { to, from });
            if (isBeenHandled)
                break;
        }
        if (!isBeenHandled)
            next(); // Fallback to accept all route
    }));
}
exports.defineRule = defineRule;
const logInfo = (rule, index, env) => {
    console.info(`%cRule accepted at index "${index}" from "${env.from.path}" to "${env.to.path}"\n%cRemark: ${rule.remark}`, 'font-size: larger', 'font-size: normal');
};
