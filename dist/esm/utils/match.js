export const matchConstraint = (constraint, location) => {
    if (typeof constraint === 'string')
        return constraint === location.path;
    if (constraint instanceof RegExp)
        return constraint.test(location.path);
    return constraint(location);
};
