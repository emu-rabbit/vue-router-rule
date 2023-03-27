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
class RouterRuleBuilder {
    constructor(remark) {
        this.remark = remark;
        this.commands = [];
    }
    // Conditions
    when(condition) {
        this.commands.push({
            type: 'condition',
            condition
        });
        return this;
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
        this.commands.push({
            type: 'task',
            task
        });
        return this;
    }
    // Store
    save(key) {
        this.commands.push({
            type: 'store',
            action: 'save',
            key
        });
        return this;
    }
    load(key) {
        this.commands.push({
            type: 'store',
            action: 'load',
            key
        });
        return this;
    }
    // Navigates
    next(nextParamProvider) {
        this.commands.push({
            type: 'next',
            paramProvider: nextParamProvider
        });
        return new RouterRuleImpl(this.commands, this.remark);
    }
    accept() {
        return this.next(() => undefined);
    }
    deny() {
        return this.next(() => false);
    }
    redirect(location) {
        return this.next((env) => __awaiter(this, void 0, void 0, function* () {
            if (typeof location === 'function')
                return yield location(env);
            return location;
        }));
    }
    continue() {
        return this
            .when(() => false) // Set condition to failed then skip this rule
            .accept();
    }
    // Statics
    static create() {
        return (remark) => new RouterRuleBuilder(remark);
    }
}
exports.RouterRuleBuilder = RouterRuleBuilder;
class RouterRuleImpl {
    constructor(commands, remark) {
        this.commands = commands;
        this.remark = remark;
    }
    exec(environment, next, store) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const command of this.commands) {
                switch (command.type) {
                    case 'condition':
                        if (!(yield command.condition(environment)))
                            return { isBeenHandled: false, nextParams: null };
                        break;
                    case 'task':
                        yield command.task(environment);
                        break;
                    case 'store':
                        if (command.action === 'save') {
                            store.push(command.key);
                        }
                        else {
                            if (!store.includes(command.key))
                                return { isBeenHandled: false, nextParams: null };
                        }
                        break;
                    case 'next':
                        const params = yield command.paramProvider(environment);
                        next(params);
                        return { isBeenHandled: true, nextParams: params };
                }
            }
            throw Error('Rule lack of an result');
        });
    }
}
