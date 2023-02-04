import { IReaction, Jointers } from "runner/reaction/interfaces/controller";

export class JsCodeReaction implements IReaction{
  inputs: Jointers = {};
  outputs: Jointers = {};
  constructor(public id: string) {

  }
}