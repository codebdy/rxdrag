import { IJointer, IReaction } from "../interfaces/controller";
import { IReactionDefineMeta } from "../interfaces/metas";

export class CodeReaction implements IReaction {
  id: string;
  inputs: IJointer[] = [];
  outputs: IJointer[] = [];
  constructor(meta: IReactionDefineMeta) {
    this.id = meta.id
  }
}