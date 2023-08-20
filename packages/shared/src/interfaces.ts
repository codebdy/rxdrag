
export type Unsubscribe = () => void;

export type Listener<T = unknown> = (value: T) => void

export interface ISubscribableRecord<T = unknown> {
  getRecord(): Record<string, T | undefined>
  subscribeChange: (listener: Listener<Record<string, T | undefined>>) => Unsubscribe
}