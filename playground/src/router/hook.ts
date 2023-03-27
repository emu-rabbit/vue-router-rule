import { defineRule, RouterRuleBuilder } from 'vue-router-rule'
import router from './index'

const Builder = RouterRuleBuilder.create<Record<string, number>>()

const info = 'info'

const {bus} = defineRule(
    router,
    [
        Builder('aa')
            .to(['/info', '/ppp'])
            .accept(),
        Builder('First meet')
            .any()
            .redirect(() => `/${info}`)
    ]
)

// bus.on('rule-resolve', payload => {
//     console.log('Resolve', payload)
// })
bus.on('rule-accept', payload => {
    console.log('Accept', payload)
})
bus.on('rule-deny', payload => {
    console.log('Deny', payload)
})
bus.on('rule-redirect', payload => {
    console.log('Redirect', payload)
})
bus.on('no-rule-match', payload => {
    console.log('No match', payload)
})