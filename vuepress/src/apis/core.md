# Core APIs

Here are some core methods of Vue Router Rule

- [defineRule](#definerule)

## defineRule
Define a set of rules to the router
- Signature
    ```ts
    interface defineRule{
        <ContextType extends Object = any>(
            router: Router,
            rules: RouterRule<ContextType>[],
            options?: Partial<DefineRuleOptions>
        ): {
            bus: RouterRuleBus<ContextType>;
        }
    }
    ```
- GenericTypes
    | name | default | description |
    | ---- | ---- |    ----     |
    | `ContextType` | `any` | The context type |
- Parameters
    | name | default | type | description |
    | ---- | ---- | ---- |    ----     |
    | router | X | [`Router`](https://router.vuejs.org/api/interfaces/Router.html) | The Vue router instance |
    | rules | X | `RouterRule<ContextType>[]` | The defined rules |
    | options | `{ debugInfo: false }` | `Partial<DefineRuleOptions>` | The options |
    
- Return `{ bus: RouterRuleBus<ContextType> }`
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