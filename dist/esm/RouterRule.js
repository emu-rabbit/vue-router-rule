import { matchConstraint } from "./utils/match";
const RuleBuilderStore = new Map();
export class RouterRuleBuilder {
    remark;
    constructor(remark) {
        this.remark = remark;
    }
    conditions = [];
    // Conditions
    when(condition) {
        return this.conditions.push(condition), this;
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
        return this.when(async (context) => (await task(context), true));
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
        return new RouterRuleImpl(this.conditions, this.remark, result);
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
        return (remark) => new RouterRuleBuilder(remark);
    }
}
class RouterRuleImpl {
    conditions;
    remark;
    result;
    constructor(conditions, remark, result) {
        this.conditions = conditions;
        this.remark = remark;
        this.result = result;
    }
    async exec(context, next) {
        for (const condition of this.conditions) {
            if (!(await condition(context)))
                return false;
        }
        next(this.result);
        return true;
    }
}
