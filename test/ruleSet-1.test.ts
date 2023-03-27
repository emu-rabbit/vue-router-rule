import { describe } from 'vitest'
import router from './router'
import { defineRule, RouterRuleBuilder } from '../src/index'
import { NavigationTest } from './utils'

createRule()

describe('A all accept rule', () => {
    const Test = new NavigationTest(router)
    
    Test.shouldAccept('/', '/')
    Test.shouldAccept('/', '/abc')
    Test.shouldAccept('/abc?id=5', '/login')
    Test.shouldAccept('/login', '/abc?id=5')
    Test.shouldAccept('/l#hash', '/abc')
    Test.shouldAccept('/', '/l#hash')
})

function createRule() {
    const Builder = RouterRuleBuilder.create()
    defineRule(
        router,
        [
            Builder()
                .any()
                .accept()
        ]
    )
}