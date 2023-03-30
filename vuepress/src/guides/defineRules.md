# Define Router Rules

The most important thing is to define where the `Router` should go under certain circumstances, and we call them `RouterRule`s.  
We will use `RouterRuleBuilder` to create a builder, set its content, and finally generate an instance of `RouterRule`.

To use `RouterRuleBuilder`, you must use the static function `RouterRuleBuilder.create` to generate a factory function.
```ts
const Builder = RouterRuleBuilder.create()
```

Afterwards, we can call the variable `Builder` above and pass in the `remark` parameter.  
This `remark` parameter will become `RouterRule#remark` in the end.  
Although it is optional, it is strongly recommended to fill it in as it will make debugging and code reading easier later on.
```ts
Builder('Accept route in allow list')
Builder('Deny user without permission')
Builder('Random chance navigate to the rainbow unicorn')
```

After creating the builder, we can now proceed to configure the conditions.  
Currently, there are several condition methods available:
- `#when`
- `#to`
- `#from`
- `#withContext`
- `#any`

`#when` is a versatile condition setting, and other condition methods can be converted into an equivalent `#when`.  
`#to` is used to check the parameter `to` related to `beforeEach`, and can be passed a string, regular expression, or a function used for checking. It can also be passed an array, where any element in the array will make the condition pass, which is equivalent to `or`.  
`#from` is similar to `#to`, but is used to check the parameter `from` of `beforeEach`.  
We will explain `#withContext` in [Context](context.md).  
`#any` accepts any condition, which is the same as not writing it. However, it can be written for the sake of code readability.

```ts
// RouterRuleBuilder#to
Builder('On request enter info page')
    .to('/info')

Builder('Path start with "user"')
    .to(/^\/user/)

Builder('To path length over 10')
    .to(to => to.path.length > 10)

Builder('Using array ("or" condition)')
    .to(['/info', /^\/user/, to => to.path.length > 10])

Builder('Using chaining ("and" condition)')
    .to(/^\/user/)
    .to(to => to.path.length > 10)

// RouterRuleBuilder#from
Builder('Same as the #from')
    .from('/dashboard')

// RouterRuleBuilder#any
Builder('Match all the navigation')
    .any()

// RouterRuleBuilder#when
Builder('You can get to, from & context from the parameter')
    .when(({ to, from, context }) => to.path === '/login')

Builder('Can used only for your custom condition')
    .when(() => Math.random() > 0.5)

// Chaining
Builder('Chain these together')
    .from('/login')
    .to('/dashboard')
    .when(() => Math.random() > 0.5)
```

After defining the conditions, the most important thing is to decide where to go.  
Currently, there are several methods of directing.
- `#next`
- `#accept`
- `#deny`
- `#redirect`
- `#continue`

All directing methods will return a `RouterRule` instance, which means you cannot chain any methods of `RouterRuleBuilder`.  
`RouterRule` is a complete rule definition and can be used by passing it to the `defineRule` function.

`#next` is a versatile method. Except for `#continue`, all directing methods can be converted into equivalent `#next` methods.  
`#next` accepts a function that takes `EnvironmentContext` as input and returns a parameter provided to the `next` parameter in `beforeEach`.
Simply put, `Builder().next(() => false)` is equivalent to calling `next(false)` in `beforeEach`.  

`#accept` will accept the directing, which is equivalent to the original `next()`.  
`#deny` will reject the directing, which is equivalent to the original `next(false)`.  
`#redirect` will redirect navigation.  
`#continue` will treat this rule as a condition failure and not direct anything, move on and checking the next rule.

```ts
// #accept
Builder('Accept a navigation')
    .accept()

// #deny
Builder('Deny a navigation')
    .deny()

// #redirect
Builder('Redirect to static location')
    .redirect('/login')

Builder('Redirect to dynamic location')
    .redirect(({ from }) => `/login?redirect=${from.path}`)

// #continue
Builder('Move to next rule')
    .continue()

// #next
Builder('Same to #accept')
    .next(() => undefined)

Builder('Same to #deny')
    .next(() => false)

Builder('Can use async')
    .next(async() => (await api()))
```

If you want to perform some extra tasks, you can use `#do`.  
`#do` is a simple method that performs a task and can be combined with the above condition and directing methods.

```ts
Builder('If user has token, save it and accept navigation')
    .when(() => piniaStore.token !== null)
    .do(() => localStorage.setItem('token', piniaStore.token))
    .accept()
```

