import { InputHandler, IHandlerArgs, IJointer } from "../interfaces/interfaces";

export class Jointer implements IJointer{
  private outlets: InputHandler[] = []

  constructor(public id:string){

  }

  flowIn: InputHandler = (args?: IHandlerArgs) => {
    for (const hanlder of this.outlets) {
      hanlder(args)
    }
  }

  connect = (handler: InputHandler) => {
    this.outlets.push(handler)
  }

  disconnect = (handler: InputHandler) => {
    this.outlets.splice(this.outlets.indexOf(handler), 1)
  }
}