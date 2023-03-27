export class RouterRuleBus {
    listeners = {};
    on(event, listener) {
        if (!this.listeners[event])
            this.listeners[event] = [];
        this.listeners[event].push(listener);
    }
    off(event, listener) {
        if (!listener) {
            this.listeners[event] = [];
        }
        else {
            const index = this.listeners[event]?.findIndex(l => l === listener);
            if (index !== undefined && index !== -1)
                this.listeners[event].splice(index, 1);
        }
    }
    emit(event, payload) {
        this.listeners[event]
            ?.forEach(callback => callback(payload));
    }
}
