import { InputHandlers, IReaction, OutputJointers } from "runner/reaction/interfaces/interfaces";

export class JsCodeReaction implements IReaction{
  inputs: InputHandlers = {};
  outputs: OutputJointers = {};
  constructor(public id: string) {

  }
}