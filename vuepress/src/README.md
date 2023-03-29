---
title: Introduction
---

::: warning
This package is currently under development.  
Everything is subject to frequent changes, and it may be incomplete, unstable, or broken.  
If you have any feedback, please submit it via [Github Issues](https://github.com/emu-rabbit/vue-router-rule/issues).
:::

# Introduction
Vue Router Rule is an addon for [Vue Router](https://router.vuejs.org/).  
For complex router navigation rules (especially those involving authorization and business needs), the guard [beforeEach](https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards) can become unwieldy, unreadable, and difficult to debug or maintain.  
This addon provides an alternative way to define rules that are more readable and maintainable.

# It changed what?

For example, consider the following code (modified from [this](https://github.com/youlaitech/vue3-element-admin/blob/master/src/permission.ts))
```ts
const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach((to, from, next) => {
    const hasToken = getToken() // determine whether the user has logged in
    const hasRoles = userStore.roles && userStore.roles.length > 0 // determine whether the user has obtained his permission roles through getInfo

    if (hasToken) {
        if (to.path === '/login') {
            next('/')
        } else {
            if (hasRoles) {
                next()
            } else {
                try {
                    // get user info
                    await userStore.getInfo()
                    next()
                } catch (error) {
                    // remove token and go to login page to re-login
                    await userStore.resetToken()
                    next('/login')
                }
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            // in the free login whitelist, go directly
            next()
        } else {
            // other pages that do not have permission to access are redirected to the login page.
            next('/login')
        }
    }
})
```

Yeah, lot of nested `if` here.  
It's hard to read when the application grows.  
Comments are scattered everywhere in nested blocks, making it difficult to trace.  
So, if something goes wrong, you have to add `console.log` everywhere before you can debug it.  

With the use of Vue Router Rule, it now looks like this.
```ts
interface Context {
    hasToken: boolean,
    hasRoles: () => boolean
}

const Builder = RouterRuleBuilder.create<Context>()

defineRule(
    router,
    [
        Builder('Initialize context')
            .do(initializeContext)
            .continue(),

        Builder('User with token will redirect to root from login page')
            .withContext(c => c.hasToken).save('hasToken')
            .to('/login')
            .redirect('/'),

        Builder('Accept user when role already cached')
            .load('hasToken')
            .withContext(c => c.hasRoles())
            .accept(),

        Builder('Cache user role')
            .load('hasToken')
            .do(cacheRole)
            .continue(),

        Builder('Accept user on cache success')
            .load('hasToken')
            .withContext(c => c.hasRoles())
            .accept(),

        Builder('Logout on cache failed')
            .load('hasToken')
            .do(() => userStore.resetToken())
            .redirect('/login'),

        Builder('Accept user without token but want to whitelist')
            .withContext(c => !c.hasToken)
            .to(to => whiteList.indexOf(to.path) !== -1)
            .accept(),

        Builder('Redirect user without token to login')
            .any()
            .redirect('/login')
    ]
)

function initializeContext({ context }) {
    context.hasToken = !!localStorage.getItem('accessToken'),
    context.hasRoles = () => !!userStore.roles && userStore.roles.length > 0
}

async function cacheRole({ context }: ConditionParams<ContextType>) {
    try {
        await userStore.getInfo()
    } catch (error) {
        console.log(error)
    }
}
```

Everything is **FLAT**, with no more nesting.  
The TOP-DOWN rule makes it easy for you to know the reason and where to go.  
Now, when something goes wrong, you can check the console information.  
(With `debugInfo` option set to `true`) 

![Console Screenshot](/images/console.png)

Vue Router Rule also provides a wide range of [events](./guides/event-bus.md) for listening, which allows you to better track which rule has been accepted and even retrieve the parameter passed into the `next` function.  
With these events, you can define custom behaviors and make your application more flexible.

So easy, right?
