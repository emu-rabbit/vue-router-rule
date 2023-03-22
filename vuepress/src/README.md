---
title: Introduction
---

::: warning
This package is still under dev  
Everything maybe changed often, uncompleted, unstable, and broken  
Any feedback can submit at [Github Issues](https://github.com/emu-rabbit/vue-router-rule/issues)
:::

# Introduction

Vue Router Rule is a [Vue Router](https://router.vuejs.org/) addon.  
For some complex router navigation rules (usually with authorization, business needed), the guard [beforeEach](https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards) become huge, unreadable and hard to debug or maintains.  
This addon provide another way to define rules for more readable and maintainable coding.

# What will change?

For example a original beforeEach guard ( Modified from [this](https://github.com/youlaitech/vue3-element-admin/blob/master/src/permission.ts) )
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

> Yeah, lot of nested if  
> It's hard to read when application grow  
> Comments are every where in nested blocks and make it hard to trace  
> So, if somethings went wrong, you must add console.log every where before

And with Vue Router Rule you can do it
```ts
interface Context {
    hasToken: boolean,
    hasRoles: () => boolean
}

const Builder = RouterRuleBuilder.create<Context>()

defineRule(
    router,
    [
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
    ],
    initialContextProvider
)

function initialContextProvider() {
    return {
        hasToken: !!localStorage.getItem('accessToken'),
        hasRoles: () => !!userStore.roles && userStore.roles.length > 0
    }
}

async function cacheRole({ context }: ConditionParams<ContextType>) {
    try {
        await userStore.getInfo()
    } catch (error) {
        console.log(error)
    }
}
```

Everything is **FLAT**, no nest anymore  
The TOP-DOWN rule make you easy to know what reason & where to go  
And now when something went wrong, you can checkout the console info  
![Console Screenshot](/images/console.png)

So easy to trace what happened, right?
