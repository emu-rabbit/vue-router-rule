import { defineRule, RouterRuleBuilder } from 'vue-router-rule'
import router from './index'

const Builder = RouterRuleBuilder.create()

const info = 'info'

defineRule(
    router,
    [
        Builder('aa')
            .to(['/info', '/ppp'])
            .accept(),
        Builder('First meet')
            .any()
            .redirect(() => `/${info}`)
    ],
    {
        debugInfo: true
    }
)