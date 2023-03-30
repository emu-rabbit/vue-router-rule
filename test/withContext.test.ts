// Testing RouterRuleBuilder#withContext
import { describe } from 'vitest'
import { NavigationTest } from './utils'
import router from './router'
import { defineRule, RouterRuleBuilder } from '../src/index'

createRule()

describe('RouterRuleBuilder#withContext', () => {
    const Test = new NavigationTest(router)

    Test.shouldAccept('/', '/login')
    Test.shouldAccept('/', '/dashboard')

    Test.shouldRedirect('/', '/fake-unicorn', '/unicorn')
})

function createRule() {
    const Builder = RouterRuleBuilder.create<Context>()
    defineRule(
        router,
        [
            Builder()
                .do(({ context }) => {
                    context.isLoggedIn = true
                    context.modified = false
                })
                .continue(),

            Builder()
                .to(['/', '/login', '/unicorn'])
                .accept(),

            Builder()
                .to('/dashboard')
                .withContext(c => c.isLoggedIn)
                .accept(),

            Builder()
                .do(({ context }) => {
                    context.modified = true
                })
                .continue(),

            Builder()
                .withContext(c => c.modified)
                .redirect('/unicorn'),

            Builder()
                .any()
                .redirect('/login')
        ]
    )
}

interface Context {
    isLoggedIn: boolean,
    modified: boolean
}