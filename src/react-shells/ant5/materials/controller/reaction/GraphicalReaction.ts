import { Jointer } from "../../../../../runner/reaction/classes/jointer";
import { IJointer, IReaction, IReactionFactoryOptions } from "../../../../../runner/reaction/interfaces/controller";
import { IReactionDefineMeta, ReactionType } from "../../../../../runner/reaction/interfaces/metas";

export class GraphicalReaction implements IReaction {
  id: string;
  inputs: IJointer[] = [];
  outputs: IJointer[] = [];
  reactions: IReaction[] = [];
  constructor(private meta: IReactionDefineMeta, private options?: IReactionFactoryOptions) {
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
          this.inputs.push(new Jointer(reactionMeta.id, reactionMeta.name || "input"));
          break;
        case ReactionType.End:
          this.outputs.push(new Jointer(reactionMeta.id, reactionMeta.name || "output"));
          break;
        case ReactionType.SingleReaction:
        case ReactionType.ControllerDefaultReaction:
        case ReactionType.ControllerReaction:
          const material = this.getMaterial(reactionMeta.materialName)
          if (material?.reaction) {
            this.reactions.push(material.reaction(reactionMeta, this.options))
          }
          break;
      }
    }
  }

  private contructRelations() {
    for (const invokeMeta of this.meta.logicMetas?.invokes || []) {
      let sourceJointer = this.inputs.find(jointer => jointer.id === invokeMeta.source.nodeId)
      if (!sourceJointer && invokeMeta.source.portId) {
        sourceJointer = this.reactions.find(reaction => reaction.id === invokeMeta.source.nodeId)?.outputs.find(output => output.id === invokeMeta.source.portId)
      }

      if (!sourceJointer) {
        throw new Error("Can find source jointer")
      }

      let targetJointer = this.outputs.find(jointer => jointer.id === invokeMeta.target.nodeId)
      if (!targetJointer && invokeMeta.target.portId) {
        targetJointer = this.reactions.find(reaction => reaction.id === invokeMeta.target.nodeId)?.inputs.find(input => input.id === invokeMeta.target.portId)
      }

      if (!targetJointer) {
        throw new Error("Can find target jointer")
      }

      sourceJointer.connect(targetJointer)
    }
  }

  private getMaterial(name: string) {
    return this.options?.materials?.find(material => material.name === name)
  }
}
