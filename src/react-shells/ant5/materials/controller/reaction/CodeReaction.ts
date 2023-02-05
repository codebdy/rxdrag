import { IReaction, IJointer, IReactionDefineMeta } from "runner/reaction";


export class CodeReaction implements IReaction {
  id: string;
  inputs: IJointer[] = [];
  outputs: IJointer[] = [];
  constructor(meta: IReactionDefineMeta) {
    this.id = meta.id
  }
}