import type { RouteLocation, Router } from "vue-router";
import type { RouterRule } from "./types";
export { RouterRuleBuilder } from "./RouterRule";
export declare function defineRule<ContextType>(router: Router, rules: RouterRule<ContextType>[], initialContext?: (location: {
    to: RouteLocation;
    from: RouteLocation;
}) => (ContextType | Promise<ContextType>)): void;
//# sourceMappingURL=index.d.ts.map