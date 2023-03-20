import { IReaction, IJointer, IReactionDefineMeta, IReactionMeta, IConfigMeta } from "@rxdrag/schema";

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