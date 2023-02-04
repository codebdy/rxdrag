import { IJointer, IReaction } from "runner/reaction/interfaces/controller";

export class SetPropReaction implements IReaction {
  inputs: IJointer[] = [];
  outputs: IJointer[] = [];
  constructor(public id: string) {

  }

}