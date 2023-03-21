import { defineRule, RouterRuleBuilder } from 'vue-router-rule'
import router from './index'

const Builder = RouterRuleBuilder.create()

defineRule(
    router,
    [
        Builder()
            .any()
            .accept()
    ]
)