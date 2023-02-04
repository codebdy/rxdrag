import { IReaction, Jointers } from "../interfaces/interfaces";
import { IReactionDefineMeta, ReactionType } from "../interfaces/metas";

export class GraphicalReaction implements IReaction {
  id: string;
  inputs: Jointers = {};
  outputs: Jointers = {};
  constructor(meta: IReactionDefineMeta) {
    this.id = meta.id
    //第一步，解析节点
    for(const reactionMeta of meta.logicMetas?.reactions||[]){
      if(reactionMeta.type === ReactionType.Start){

      }
    }

    //第二步， 构建连接关系
  }
}
