# Core APIs

Here are some core methods of Vue Router Rule

## defineRule
- generic
    - `Context`
- Params
    - router  
        - [`Router`](https://router.vuejs.org/api/interfaces/Router.html)
    - rules
        - `RouterRule<Context>`
    - initialContext
        - `(location: { to: RouteLocation, from: RouteLocation }) => (ContextType | Promise<ContextType>)`
- Return `void`