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
function defineRule(router, rules, initialContext) {
    router.beforeEach((to, from, next) => __awaiter(this, void 0, void 0, function* () {
        let isBeenHandled = false;
        const context = initialContext ? yield initialContext({ to, from }) : undefined; // initialize context
        // Loop the rules
        for (let i = 0; i <= rules.length - 1; i++) {
            const rule = rules[i];
            if (yield rule.exec({ to, from, context }, next)) {
                console.info(`Rule ${rule.remark} at index ${i} accepted from ${from.path} to ${to.path}`);
                isBeenHandled = true;
            }
            if (isBeenHandled)
                break;
        }
        if (!isBeenHandled)
            next(); // Fallback to accept all route
    }));
}
exports.defineRule = defineRule;
