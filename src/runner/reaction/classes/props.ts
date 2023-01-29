
export type PropsListener = (props: any) => void

var listenerId = 1
export class Props {
  private listeners: {
    [id: string]: PropsListener | undefined
  } = {}
  
  constructor(private props?: any) {

  }

  getValue = (name: string) => {
    return this.props?.[name]
  }

  setValue = (name: string, value: any) => {
    this.props = { ...this.props, [name]: value }
    this.dispatchChange()
  }

  subscribeToChange = (listener: PropsListener) => {
    listenerId++
    const id = listenerId
    this.listeners[id.toString()] = listener
    const unsubscribe = () => {
      delete this.listeners[id]
    }
    return unsubscribe
  }

  private dispatchChange() {
    for (const id of Object.keys(this.listeners)) {
      this.listeners[id.toString()]?.(this.props)
    }
  }
}