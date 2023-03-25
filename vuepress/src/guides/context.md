# Context

Context is an API that can be used but is optional.  
It provides a place for developers to store some information between different rules.  

Both `RouterRuleBuilder` and `RouterRule` have a generic type `ContextType`, which can be specified when using `RouterRuleBuilder.create`.
```ts
interface MyContext {
    username: string,
    shouldGetUnicorn: boolean
}

const Builder = RouterRuleBuilder.create<MyContext>()
```

By doing so, you can use this Context during the creation of `RouterRule`.  
You may want to initialize the content of the Context at the beginning and then use it in the subsequent `RouterRule` to create conditions.

```ts
defineRule(
    router,
    [
        Builder('Initialize context')
            .do(initializeContext)
            .continue(),

        Builder('GO TO UNICORN PAGE')
            .to(to => to.path !== '/unicorn')
            .withContext(c => c.shouldGetUnicorn)
            .redirect('/unicorn'),

        Builder('Accept all navigation')
            .any()
            .accept()
    ]
)

const initializeContext = () => {
    return {
        username: piniaStore.username,
        shouldGetUnicorn: Math.random() < 0.5
    }
}
```

You can also modify the contents of the Context midway through the process.  
However, please note that you should not directly modify the entire Context object.
```ts
// ...
Builder('Re-get username')
    .do(renewUsername)
    .continue()
// ...
const renewUsername = async({ context }) => {
    piniaStore.username = await api()
    context.username = piniaStore.username
    // context = { username: piniaStore.username } // DO NOT DO THIS
}
```