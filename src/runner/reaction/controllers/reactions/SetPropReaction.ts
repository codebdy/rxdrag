import { InputHandlers, IReaction, OutputJointers } from "runner/reaction/interfaces/interfaces";

export class SetPropReaction implements IReaction {
  inputs: InputHandlers = {};
  outputs: OutputJointers = {};
  constructor(public id: string) {

  }
}