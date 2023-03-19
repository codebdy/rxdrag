import { Jointer } from "../../../../../runner/minions/classes/jointer";
import { IJointer, IReaction, IReactionFactoryOptions } from "../../../../../runner/minions/interfaces/controller";
import { IConfigMeta, IReactionDefineMeta, IReactionMeta, ReactionType } from "../../../../../runner/minions/interfaces/metas";

export class GraphicalReaction implements IReaction {
  id: string;
  inputs: IJointer[] = [];
  outputs: IJointer[] = [];
  reactions: IReaction[] = [];
  constructor(private defineMeta: IReactionDefineMeta, private options: IReactionFactoryOptions, public meta?: IReactionMeta<IConfigMeta>) {
    //注意这个id的处理，自定reaction必须要用meta id，不能用defineMeta id
    this.id = meta?.id || defineMeta.id

    //第一步，解析节点
    this.constructReactions()

    //第二步， 构建连接关系
    this.contructRelations()
  }
  destory(): void {
    for(const reaction of this.reactions){
      reaction.destory()
    }
    this.reactions = []
    this.outputs = []
    this.inputs = []
  }

  private constructReactions() {
    for (const reactionMeta of this.defineMeta.logicMetas?.reactions || []) {
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
    for (const invokeMeta of this.defineMeta.logicMetas?.invokes || []) {
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
