import { IJointer, InputHandler } from "../interfaces/activity"

export class Jointer implements IJointer {
  //下游Jointer的数据接收函数
  private outlets: [InputHandler, Jointer | undefined][] = []

  constructor(public id: string, public name: string) {
  }
  runContext?: IJointer["runContext"]
  //接收上游数据，并分发到下游
  push: InputHandler = (inputValue?: any, runContext?: IJointer["runContext"]) => {
    for (const jointerInput of this.outlets) {
      if (jointerInput[1]) {
        jointerInput[1].runContext = runContext;
      }
      jointerInput[0](inputValue, runContext)
    }
  }
  //添加下游Jointer
  connect = (jointer: InputHandler, parent?: Jointer) => {
    this.outlets.push([jointer, parent])
  }

  disconnect = (jointer: InputHandler) => {
    const index = this.outlets.findIndex(([fun]) => fun === jointer);
    if (index != -1) {
      this.outlets.splice(index, 1);
    }
  }
}