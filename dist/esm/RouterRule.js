import { matchConstraint } from "./utils/match";
export class RouterRuleBuilder {
    remark;
    constructor(remark) {
        this.remark = remark;
    }
    commands = [];
    // Conditions
    when(condition) {
        this.commands.push({
            type: 'condition',
            condition
        });
        return this;
    }
    to(constraint) {
        return this.when(({ to }) => (Array.isArray(constraint) ? constraint : [constraint]).some(c => matchConstraint(c, to)));
    }
    from(constraint) {
        return this.when(({ from }) => (Array.isArray(constraint) ? constraint : [constraint]).some(c => matchConstraint(c, from)));
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
        return this.next(async (env) => {
            if (typeof location === 'function')
                return await location(env);
            return location;
        });
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
class RouterRuleImpl {
    commands;
    remark;
    constructor(commands, remark) {
        this.commands = commands;
        this.remark = remark;
    }
    async exec(environment, next, store) {
        for (const command of this.commands) {
            switch (command.type) {
                case 'condition':
                    if (!(await command.condition(environment)))
                        return { isBeenHandled: false, nextParams: null };
                    break;
                case 'task':
                    await command.task(environment);
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
                    const params = await command.paramProvider(environment);
                    next(params);
                    return { isBeenHandled: true, nextParams: params };
            }
        }
        throw Error('Rule lack of an result');
    }
}
