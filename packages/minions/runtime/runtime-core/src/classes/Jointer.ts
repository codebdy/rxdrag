import { ConnectListener, IJointer, InputHandler } from "../interfaces/activity"

export class Jointer implements IJointer {
  //下游Jointer的数据接收函数
  private outlets: InputHandler[] = []
  private connectListeners: ConnectListener[] = []

  constructor(public id: string, public name: string) {
  }

  //接收上游数据，并分发到下游
  push: InputHandler = (inputValue?: unknown, runContext?: object) => {
    for (const jointerInput of this.outlets) {
      jointerInput(inputValue, runContext)
    }
  }
  //添加下游Jointer
  connect = (inputHandler: InputHandler) => {
    this.outlets.push(inputHandler)
    for (const listener of this.connectListeners) {
      listener(inputHandler)
    }
  }

  disconnect = (jointer: InputHandler) => {
    const index = this.outlets.indexOf(jointer);
    if (index != -1) {
      this.outlets.splice(index, 1);
    }
  }

  onConnect = (listener: ConnectListener) => {
    this.connectListeners.push(listener)

    return () => {
      this.connectListeners.splice(this.connectListeners.indexOf(listener), 1)
    }
  }
}