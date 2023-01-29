import { InputHandler, IHandlerArgs, IJointer } from "../interfaces/interfaces";

export class Jointer implements IJointer{
  private outlets: InputHandler[] = []

  flowIn: InputHandler = (args?: IHandlerArgs) => {
    for (const hanlder of this.outlets) {
      hanlder(args)
    }
  }

  addHandler = (handler: InputHandler) => {
    this.outlets.push(handler)
  }

  removeHandler = (handler: InputHandler) => {
    this.outlets.splice(this.outlets.indexOf(handler), 1)
  }
}