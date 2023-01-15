import { IHandlers, ILogic } from "runner/reaction/interfaces";

export class PopupLogic implements ILogic {
  name: string = "PopupLogic";
  state: any;
  inputs: IHandlers = {};
  outputs: IHandlers = {};

  constructor(name: string) {
    this.name = name
    this.inputs["close"] = () => {

    }
  }

  close = () => {

  }
}