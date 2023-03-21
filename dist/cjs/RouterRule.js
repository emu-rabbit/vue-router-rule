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
exports.RouterRuleBuilder = void 0;
const match_1 = require("./utils/match");
const RuleBuilderStore = new Map();
class RouterRuleBuilder {
    constructor() {
        this.conditions = [];
    }
    // Conditions
    when(condition) {
        return this.conditions.push(condition), this;
    }
    to(constraint) {
        return this.when(({ to }) => (Array.isArray(constraint) ? constraint : [constraint]).some(c => (0, match_1.matchConstraint)(c, to)));
    }
    from(constraint) {
        return this.when(({ from }) => (Array.isArray(constraint) ? constraint : [constraint]).some(c => (0, match_1.matchConstraint)(c, from)));
    }
    withContext(constraint) {
        return this.when(({ context }) => constraint(context));
    }
    any() {
        return this.when(() => true);
    }
    // Utils
    do(task) {
        return this.when((context) => __awaiter(this, void 0, void 0, function* () { return (yield task(context), true); }));
    }
    // Store
    save(key) {
        const newBuilder = new RouterRuleBuilder();
        newBuilder.conditions = [...this.conditions];
        RuleBuilderStore.set(key, newBuilder);
        return this;
    }
    load(key) {
        const storeBuilder = RuleBuilderStore.get(key);
        if (storeBuilder) {
            this.conditions = [...storeBuilder.conditions];
        }
        return this;
    }
    // Navigates
    next(result) {
        return new RouterRuleImpl(this.conditions, result);
    }
    accept() {
        return this.next();
    }
    deny() {
        return this.next(false);
    }
    redirect(location) {
        return this.next(location);
    }
    continue() {
        return this
            .when(() => false) // Set condition to failed then skip this rule
            .next();
    }
    // Statics
    static create() {
        return () => new RouterRuleBuilder();
    }
}
exports.RouterRuleBuilder = RouterRuleBuilder;
class RouterRuleImpl {
    constructor(conditions, result) {
        this.conditions = conditions;
        this.result = result;
    }
    exec(context, next) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const condition of this.conditions) {
                if (!(yield condition(context)))
                    return false;
            }
            next(this.result);
            return true;
        });
    }
}
