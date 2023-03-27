# Store

Store is a feature that revolves around `RouterRuleBuilder#save` and `RouterRuleBuilder#load`, used to cache the results of conditionals.  
Sometimes, within a guard, we still need nested if statements, such as the following code.
```ts
beforeEach((to) => {
    if (['/402', '/login'].includes(to.path)) next()

    if (user.token) {
        if (permissionAllow) {
            next()
        } else {
            next('/402')
        }
    } else {
        next('/login')
    }
})
```

And obviously, our `defineRule` takes an array as input, meaning each Rule is independent and has no dependency or nested relationship.  
But writing it like below would be a frustrating experience. 
```ts
defineRule(
    router,
    [
        Builder()
            .to(['/402', '/login'])
            .accept(),

        Builder()
            .when(() => user.token)
            .when(() => permissionAllow)
            .accept(),

        Builder()
            .when(() => user.token)
            .when(() => !permissionAllow)
            .redirect('/402'),

        Builder()
            .when(() => !user.token)
            .redirect('/login')
    ]
)
```
`RouterRuleBuilder#save` and `RouterRuleBuilder#load` are used for caching the result of complex conditions in if statements or nested conditions.

In the example you mentioned, instead of repeating the same condition multiple times, you can save the result of the condition using RouterRuleBuilder#save, and then load it in the next condition using RouterRuleBuilder#load. This can simplify the code and reduce the chances of typos or errors.
```ts
defineRule(
    router,
    [
        Builder()
            .to(['/402', '/login'])
            .accept(),

        Builder()
            .when(() => user.token).save('userHasToken') // Here we save
            .when(() => permissionAllow)
            .accept(),

        Builder()
            .load('userHasToken') // Here we load
            .when(() => !permissionAllow)
            .redirect('/402'),

        Builder()
            .when(() => !user.token)
            .redirect('/login')
    ]
)
```
You might think it doesn't make much of a difference, but using `RouterRuleBuilder#save` and `RouterRuleBuilder#load` can achieve the DRY principle and the result will be cached, so the `() => user.token` passed function will not be executed the second time. If there are more than one linked conditions, none of the conditions will be executed.  
This also includes using work assignments like `#do` before `#save`. 

:::tip
In Vue Router Rule, we try to avoid any nesting as much as possible and keep everything flat.  
This can help us to better understand what's happening in the guards during development and debugging.
:::