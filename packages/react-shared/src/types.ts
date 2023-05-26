// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ReactComponent = React.FC<any> | React.ComponentClass<any> | string

export interface IComponents {
  [key: string]: ReactComponent | undefined
}

