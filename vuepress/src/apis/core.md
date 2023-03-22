# Core APIs

Here are some core methods of Vue Router Rule

- [defineRule](#definerule)

## defineRule
Define a set of rules to the router
- Signature
    ```ts
    interface defineRule{
        <ContextType>(
            router: Router,
            rules: RouterRule<ContextType>[],
            initialContext?: (location: {to: RouteLocation, from: RouteLocation}) => (ContextType | Promise<ContextType>)
        ): void
    }
    ```
- GenericTypes
    | name | description |
    | ---- |    ----     |
    | `ContextType` | The context type |
- Parameters
    | name | type | description |
    | ---- | ---- |    ----     |
    | router | [`Router`](https://router.vuejs.org/api/interfaces/Router.html) | The Vue router instance |
    | rules | `RouterRule<ContextType>[]` | The defined rules |
    | initialContext | `(location: { to: RouteLocation, from: RouteLocation }) => (ContextType \| Promise<ContextType>)` | The provider function for the initial context |
    
- Return `void`
```ts
// A example of all-accept routing
const Builder = RouterRuleBuilder.create()

defineRule(
    router,
    Builder('Accept all navigation')
        .any()
        .accept()
)
```