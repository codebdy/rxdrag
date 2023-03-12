import { Unsubscribe } from "./types";
export interface ICustomEvent<EventData = any> {
    type: string;
    data?: EventData;
}
export interface CustomEventClass {
    new (...args: any[]): any;
}
export interface ISubscriber<EventType = any> {
    (payload: EventType): void | boolean;
}
export interface IDispatchable<T> {
    dispatch(event: T): void | boolean;
}
export interface ISubscribable {
    subscribeTo<T extends CustomEventClass>(type: T, subscriber: ISubscriber<InstanceType<T>>): Unsubscribe;
}
export declare abstract class EventEngine<EventType extends CustomEventClass = any> implements IDispatchable<EventType>, ISubscribable {
    private subscribers;
    dispatch<T extends EventType = any>(event: T, context?: any): boolean;
    subscribeTo<T extends CustomEventClass>(type: T, subscriber: ISubscriber<InstanceType<T>>): Unsubscribe;
    private subscribe;
    private unsubscribe;
}
