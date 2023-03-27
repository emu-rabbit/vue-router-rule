# Event Bus

The Event Bus is a system that works based on events.  
When you call `defineRule`, it returns an instance of `RouterRuleBus` that can be used to listen for the following events.
- `rule-resolve`  
    This event is triggered when any navigation is resolved.
- `rule-accept`  
    This event is triggered when any navigation is accepted, more accurately, when `next()` or `next(true)` is called.
- `rule-deny`  
    This event is triggered when any navigation is denied, more accurately, when `next(false)` is called.
- `rule-redirect`  
    This event is triggered when any navigation is denied, more accurately, navigation is resolved without accept or denied.
- `no-rule-match`  
    This event is triggered when no rule is match in the end. In this situation, navigation will be accepted by default. 

To use the event bus, simply do the following
```ts
const { bus } = defineRule(/** ... */)

bus.on('rule-resolve', event => {
    console.log(event.from) // The guard parameter `from`
    console.log(event.to) // The guard parameter `to`
    console.log(event.context) // The final context object when resolved
    console.log(event.remark) // The remark of the resolved rule
    console.log(event.index) // The index of the resolved rule
    console.log(event.nextParam) // The parameter passed in to `next` when resolved
})
```

Yes, it's quite straightforward!