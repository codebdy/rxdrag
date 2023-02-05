import { Jointer } from "../../../../../runner/reaction/classes/jointer";
import { IJointer, IReaction, IReactionFactoryOptions } from "../../../../../runner/reaction/interfaces/controller";
import { IReactionMaterial } from "../../../../../runner/reaction/interfaces/material";
import { IReactionDefineMeta, ReactionType } from "../../../../../runner/reaction/interfaces/metas";

export class GraphicalReaction implements IReaction {
  id: string;
  inputs: IJointer[] = [];
  outputs: IJointer[] = [];
  reactions: IReaction[] = [];
  constructor(private meta: IReactionDefineMeta, private materials: IReactionMaterial[], private options?:IReactionFactoryOptions) {
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
        case ReactionType.ControllerDefaultReaction:
          const material = this.getMaterial(reactionMeta.materialName)
          if (material?.reactionFactory) {
            this.reactions.push(material.reactionFactory(reactionMeta, this.options))
          }
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
