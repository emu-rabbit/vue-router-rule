// Testing RouterRuleBuilder#from
import { describe } from 'vitest'
import { NavigationTest } from './utils'
import router from './router'
import { defineRule, RouterRuleBuilder } from '../src/index'

createRule()

describe('RouterRuleBuilder#from', () => {
    const Test = new NavigationTest(router)

    Test.shouldAccept('/', '/')
    Test.shouldAccept('/1', '/')
    Test.shouldAccept('/2', '/')
    Test.shouldAccept('/3', '/')
    Test.shouldAccept('/4', '/')

    Test.shouldRedirect('/login', '/', '/1')
    Test.shouldRedirect('/sss#uni', '/', '/2')
    Test.shouldRedirect('/kkipp', '/', '/3')

    Test.shouldDeny('/unicorn', '/')
})

function createRule() {
    const Builder = RouterRuleBuilder.create()
    defineRule(
        router,
        [
            Builder()
                .to(['/1', '/2', '/3', '/4'])
                .accept(),

            Builder()
                .from(['/', '/1', '/2', '/3', '/4'])
                .accept(),

            Builder()
                .from('/login')
                .redirect('/1'),
            
            Builder()
                .from(from => from.hash === '#uni')
                .redirect('/2'),

            Builder()
                .from(/pp$/)
                .redirect('/3'),

            Builder()
                .any()
                .deny()
        ]
    )
}