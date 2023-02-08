import { IReaction, IJointer, IReactionDefineMeta, IConfigMeta, IReactionMeta } from "runner/reaction";


export class CodeReaction implements IReaction {
  id: string;
  inputs: IJointer[] = [];
  outputs: IJointer[] = [];
  constructor(meta: IReactionDefineMeta) {
    this.id = meta.id
  }
  meta?: IReactionMeta<IConfigMeta> | undefined;
  destory(): void {
    throw new Error("Method not implemented.");
  }
}