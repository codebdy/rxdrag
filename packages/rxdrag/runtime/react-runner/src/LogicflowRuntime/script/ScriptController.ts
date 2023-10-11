import { IController } from "@rxdrag/minions-runtime-react";

export class ScriptController {

  constructor(public name: string, public controller: IController) { }

  on = (name?: string) => {
    console.log("===>on")
  }

  off = (name?: string) => {
    console.log("===>off")
  }

  get = (name: string) => {
    console.log("===>get", name)
  }

  dispose = () => {
    //
  }
}