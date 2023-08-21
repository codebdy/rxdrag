
export type Unsubscribe = () => void;

export type Listener<T = unknown> = (value: T) => void

export interface ISubscribable<T = unknown> {
  subscribeChange: (listener: Listener<T>) => Unsubscribe
}
