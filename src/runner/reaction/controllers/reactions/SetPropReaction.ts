import { IReaction, Jointers } from "runner/reaction/interfaces/interfaces";

export class SetPropReaction implements IReaction {
  inputs: Jointers = {};
  outputs: Jointers = {};
  constructor(public id: string) {

  }
}