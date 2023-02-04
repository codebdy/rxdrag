import { InputHandler, IJointer } from "../interfaces/controller";

export class Jointer implements IJointer {
  private outlets: IJointer[] = []

  constructor(public id: string) {

  }

  push: InputHandler = (inputValue?: any) => {
    for (const jotinter of this.outlets) {
      jotinter.push(inputValue)
    }
  }

  connect = (jointer: IJointer) => {
    this.outlets.push(jointer)
  }

  disconnect = (jointer: IJointer) => {
    this.outlets.splice(this.outlets.indexOf(jointer), 1)
  }
}