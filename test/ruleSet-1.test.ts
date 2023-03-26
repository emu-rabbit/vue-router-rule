import { describe, expect, it } from 'vitest'
import router from './router'
import { defineRule, RouterRuleBuilder } from '../src/index'
import { navigate, navigationShouldAccept } from './utils'

createRule()

describe('ruleSet-1', () => {
    it('Accept from "/" to "/"', () => 
        navigationShouldAccept(
            router,
            '/',
            '/'
        )
    )
    it('Accept from "/" to "/abc"', () => 
        navigationShouldAccept(
            router,
            '/',
            '/abc'
        )
    )
    it('Accept from "/abc?id=5" to "/login"', () => 
        navigationShouldAccept(
            router,
            '/abc?id=5',
            '/login'
        )
    )
    it('Accept from "/login" to "/abc?id=5"', () => 
        navigationShouldAccept(
            router,
            '/login',
            '/abc?id=5'
        )
    )
    it('Accept from "/l#hash" to "/abc"', () => 
        navigationShouldAccept(
            router,
            '/l#hash',
            '/abc'
        )
    )
    it('Accept from "/" to "/l#hash"', () => 
        navigationShouldAccept(
            router,
            '/',
            '/l#hash'
        )
    )
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