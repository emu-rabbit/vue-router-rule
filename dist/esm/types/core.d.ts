import type { Router } from "vue-router";
import { RouterRuleBus } from "./RouterRuleBus";
import type { DefineRuleOptions, RouterRule } from "./types";
export declare function defineRule<ContextType extends Object = any>(router: Router, rules: RouterRule<ContextType>[], options?: Partial<DefineRuleOptions>): {
    bus: RouterRuleBus<ContextType>;
};
//# sourceMappingURL=core.d.ts.map