import type { BusEventListener, BusEventName, BusEventPayload } from './types';
export declare class RouterRuleBus<C extends Object = any> {
    private readonly listeners;
    on<T extends BusEventName<C>>(event: T, listener: BusEventListener<C, T>): void;
    off<T extends BusEventName<C>>(event: T, listener?: BusEventListener<C, T>): void;
    emit<T extends BusEventName<C>>(event: T, payload: BusEventPayload<C, T>): void;
}
//# sourceMappingURL=RouterRuleBus.d.ts.map