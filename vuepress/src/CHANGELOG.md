# ChangeLog

## v0.4.1
- Feature
    - `RouterRule#remark`, `index` are accessible in bus events now
## v0.4.0
- **BREAKING CHANGE**
    - `RouterRuleBuilder#save`, `RouterRuleBuilder#load` will now cache the result instead of run all conditions again
    - `RouterRule<C>#execute` return type changed from boolean to an object contain the next parameter finally passed in
- Feature
    - Event system bus for listening rule events
- Refactor
    - Improve property SRP
    - Improve typing
    - Test workflow added
## v0.3.0
- **BREAKING CHANGE**
    - Rename interface `ConditionParams<T>` to `ExecutionEnvironment<T>`
    - `RouterRuleBuilder#next` params changed  
        (Now only accept parameter provider function instead of static parameter)
    - Remove `defineRule` parameter `initialContext`  
        (If you want to initialize the context, Using `RouterRuleBuilder#do` & `#continue` to define a first rule)
    - Generic `ContextType` must be a sub type of `object` now
- Feature
    - `RouterRuleBuilder#next`, `RouterRuleBuilder#redirect` now can get execution context to provide a dynamic location
    - New types `GuardEnvironment`, `ExecutionEnvironment<T>`, `Awaitable<T>` exported
    - Add `options` parameter to `defineRule`
    - Debug console.info is more readable now
- Refactor
    - More suitable interface names, variable names
## v0.2.0
- Feature
    - Add optional remark when construct new rule
    - Log remark in debug console.info
- Fix
    - Declaration file not emitted
- Refactor
    - Folder & file structure

## v0.1.0
Initial version of basic usage