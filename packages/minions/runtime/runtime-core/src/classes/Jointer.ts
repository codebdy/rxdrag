import { IJointer, InputHandler } from "../interfaces/activity"

export class Jointer implements IJointer {
  //出口
  private outlets: InputHandler[] = []

  constructor(public id: string, public name: string) {
  }

  //入口
  push: InputHandler = (inputValue?: any) => {
    for (const jointerInput of this.outlets) {
      jointerInput(inputValue)
    }
  }

  connect = (jointer: InputHandler) => {
    this.outlets.push(jointer)
  }

  disconnect = (jointer: InputHandler) => {
    this.outlets.splice(this.outlets.indexOf(jointer), 1)
  }
}