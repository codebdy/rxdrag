import { Jointer } from "../../../../../runner/reaction/classes/jointer";
import { IJointer, IReaction, IReactionFactoryOptions } from "../../../../../runner/reaction/interfaces/controller";
import { IReactionDefineMeta, ReactionType } from "../../../../../runner/reaction/interfaces/metas";

export class GraphicalReaction implements IReaction {
  id: string;
  inputs: IJointer[] = [];
  outputs: IJointer[] = [];
  reactions: IReaction[] = [];
  constructor(private meta: IReactionDefineMeta, private options?:IReactionFactoryOptions) {
    this.id = meta.id
    //第一步，解析节点
    this.constructReactions()

    //第二步， 构建连接关系
    this.contructRelations()
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
        case ReactionType.ControllerReaction:
          const material = this.getMaterial(reactionMeta.materialName)
          if (material?.reactionFactory) {
            this.reactions.push(material.reactionFactory(reactionMeta, this.options))
          }
          break;
      }
    }
  }

  private contructRelations(){
    for (const invokeMeta of this.meta.logicMetas?.invokes || []) {
    }
  }

  private getMaterial(name: string) {
    return this.options?.materials?.find(material => material.name === name)
  }
}
