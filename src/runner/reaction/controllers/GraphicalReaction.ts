import { Jointer } from "../classes/jointer";
import { IJointer, IReaction } from "../interfaces/controller";
import { IReactionMaterial } from "../interfaces/material";
import { IReactionDefineMeta, ReactionType } from "../interfaces/metas";

export class GraphicalReaction implements IReaction {
  id: string;
  inputs: IJointer[] = [];
  outputs: IJointer[] = [];
  reactions: IReaction[] = [];
  constructor(private meta: IReactionDefineMeta, private materials: IReactionMaterial[]) {
    this.id = meta.id
    //第一步，解析节点
    this.constructReactions()

    //第二步， 构建连接关系
  }

  private constructReactions() {
    for (const reactionMeta of this.meta.logicMetas?.reactions || []) {
      switch (reactionMeta.type) {
        case ReactionType.Start:
          this.inputs.push(new Jointer(reactionMeta.id));
          break;
        case ReactionType.End:
          this.outputs.push(new Jointer(reactionMeta.id));
          break;
        case ReactionType.SingleReaction:
          const material = this.getMaterial(reactionMeta.materialName)
          if (material?.reactionFactory) {
            this.reactions.push(material.reactionFactory(reactionMeta))
          }
          break;
        case ReactionType.ControllerDefaultReaction:
          break;
        case ReactionType.ControllerReaction:
          break;
      }
    }
  }

  private getMaterial(name: string) {
    return this.materials.find(material => material.name === name)
  }
}
