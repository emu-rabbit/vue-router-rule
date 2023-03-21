"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchConstraint = void 0;
const matchConstraint = (constraint, location) => {
    if (typeof constraint === 'string')
        return constraint === location.path;
    if (constraint instanceof RegExp)
        return constraint.test(location.path);
    return constraint(location);
};
exports.matchConstraint = matchConstraint;
