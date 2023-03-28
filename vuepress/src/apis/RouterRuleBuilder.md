# RouterRuleBuilder APIs

::: warning
This page is still uncompleted
:::

RouterRuleBuilder is a class used in creating rules

#### Methods
- [create `static`](#create)
- [when](#when)
- [to](#to)
- [from](#from)
- [withContext](#withcontext)
- [any](#any)
- [do](#do)
- [save](#save)
- [load](#load)
- [next](#next)
- [accept](#accept)
- [deny](#deny)
- [redirect](#redirect)
- [continue](#continue)


## create
Create a builder factory
- Modifier `static`
- Signature
    ```ts
    interface create {
        <ContextType>(): (remark?: string) => RouterRuleBuilder<ContextType>
    }
    ```
- GenericTypes
    | name | description |
    | ---- |    ----     |
    | `ContextType` | The context type |
- Return  
    Factory function for making new rules
```ts
interface MyContext {
    id: string,
    name: string
}
const Builder = RouterRuleBuilder.create<MyContext>()

// Build a rule for deny all navigation
Builder()
    .any()
    .deny()
```
## when
## to
## from
## withContext
## any
## do
## save
## load
## next
## accept
## deny
## redirect
## continue