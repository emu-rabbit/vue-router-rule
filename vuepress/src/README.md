---
title: Introduction
---
# Introduction

Vue Router Rule is a [Vue Router](https://router.vuejs.org/) addon.  
For some complex router navigation rules (usually with authorization, business needed), the guard [beforeEach](https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards) become huge, unreadable and hard to debug or maintains.  
This addon provide another way to define rules for more readable and maintainable coding.

# What will change?

For example a original beforeEach guard
```ts
const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach((to, from, next) => {
    const hasToken = getToken() // determine whether the user has logged in
    const hasRoles = store.getters.roles && store.getters.roles.length > 0 // determine whether the user has obtained his permission roles through getInfo

    if (hasToken) {
        if (to.path === '/login') {
            next('/')
        } else {
            if (hasRoles) {
                next()
            } else {
                try {
                    // get user info
                    await store.dispatch('user/getInfo')
                    next()
                } catch (error) {
                    // remove token and go to login page to re-login
                    await store.dispatch('user/resetToken')
                    next(`/login?redirect=${to.path}`)
                }
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            // in the free login whitelist, go directly
            next()
        } else {
            // other pages that do not have permission to access are redirected to the login page.
            next(`/login?redirect=${to.path}`)
        }
    }
})
```

With Vue Router Rule
```ts
interface Context {
    hasToken: boolean,
    hasRoles: boolean
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
            .withContext(c => c.hasRoles)
            .accept()

        Builder('Cache user role')
            .load('hasToken')
            .do(cacheRole)
            .continue(),

        Builder('Accept user on cache success')
            .load('hasToken')
            .withContext(c => c.hasRoles)
            .accept(),

        Builder('Logout on cache failed')
            .load('hasToken')
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
        hasToken: getToken(),
        hasRoles: !!store.getters.roles && store.getters.roles.length > 0
    }
}

function cacheRole({ context }: ConditionParams<ContextType>) {
    try {
        await store.dispatch('user/getInfo')
        context.hasRoles = true
    } catch (error) {
        context.hasRoles = false
    }
}
```

