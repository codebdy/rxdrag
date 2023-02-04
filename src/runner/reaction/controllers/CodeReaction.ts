import { IReaction, Jointers } from "../interfaces/controller";
import { IReactionDefineMeta } from "../interfaces/metas";

export class CodeReaction implements IReaction{
  id: string;
  inputs: Jointers = {};
  outputs: Jointers = {};
  constructor(meta: IReactionDefineMeta) {
    this.id = meta.id
  }
}