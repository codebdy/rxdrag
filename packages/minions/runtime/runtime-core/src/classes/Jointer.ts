import { IJointer, InputHandler } from "../interfaces/activity"

export class Jointer implements IJointer {
  //下游Jointer的数据接收函数
  private outlets: InputHandler[] = []

  constructor(public id: string, public name: string) {
  }

  //接收上游数据，并分发到下游
  push: InputHandler = (inputValue?: unknown, context?:unknown) => {
    for (const jointerInput of this.outlets) {
      jointerInput(inputValue, context)
    }
  }

  //添加下游Jointer
  connect = (inputHandler: InputHandler) => {
    this.outlets.push(inputHandler)
  }

  //删除下游Jointer
  disconnect = (jointer: InputHandler) => {
    this.outlets.splice(this.outlets.indexOf(jointer), 1)
  }
}