"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterRuleBus = void 0;
class RouterRuleBus {
    constructor() {
        this.listeners = {};
    }
    on(event, listener) {
        if (!this.listeners[event])
            this.listeners[event] = [];
        this.listeners[event].push(listener);
    }
    off(event, listener) {
        var _a;
        if (!listener) {
            this.listeners[event] = [];
        }
        else {
            const index = (_a = this.listeners[event]) === null || _a === void 0 ? void 0 : _a.findIndex(l => l === listener);
            if (index !== undefined && index !== -1)
                this.listeners[event].splice(index, 1);
        }
    }
    emit(event, payload) {
        var _a;
        (_a = this.listeners[event]) === null || _a === void 0 ? void 0 : _a.forEach(callback => callback(payload));
    }
}
exports.RouterRuleBus = RouterRuleBus;
