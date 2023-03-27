import type { BusEventListener, BusEventName, BusEventPayload } from './types'

export class RouterRuleBus<C> {
    private readonly listeners : {
        [K in BusEventName<C>]?: BusEventListener<C, K>[]
    } = {}

    on<T extends BusEventName<C>>(event: T, listener: BusEventListener<C, T>) {
        if (!this.listeners[event]) this.listeners[event] = []
        this.listeners[event]!.push(listener)
    }

    off<T extends BusEventName<C>>(event: T, listener?: BusEventListener<C, T>) {
        if (!listener) {
            this.listeners[event] = []
        } else {
            const index = this.listeners[event]?.findIndex(l => l === listener)
            if (index !== undefined && index !== -1) this.listeners[event]!.splice(index, 1)
        }
    }

    emit<T extends BusEventName<C>>(event: T, payload: BusEventPayload<C, T>) {
        this.listeners[event]
            ?.forEach(callback => callback(payload))
    }
}