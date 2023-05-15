import { IConfigMeta, IJointer, IReaction, IReactionDefineMeta, IReactionMeta, ReactionType } from "@rxdrag/schema";
import { Jointer } from "../classes/jointer";
import { IActivityFactoryOptions } from "./IFactoryOptions";

export class GraphicalReaction implements IReaction {
  id: string;
  inputs: IJointer[] = [];
  outputs: IJointer[] = [];
  reactions: IReaction[] = [];
  constructor(private defineMeta: IReactionDefineMeta, private options: IActivityFactoryOptions, public meta?: IReactionMeta<IConfigMeta>) {
    //注意这个id的处理，自定reaction必须要用meta id，不能用defineMeta id
    this.id = meta?.id || defineMeta.id

    //第一步，解析节点
    this.constructReactions()

    //第二步， 构建连接关系
    this.contructRelations()
  }
  destory(): void {
    for (const reaction of this.reactions) {
      reaction.destory()
    }
    this.reactions = []
    this.outputs = []
    this.inputs = []
  }

  //一个图的构建所有节点
  private constructReactions() {
    for (const reactionMeta of this.defineMeta.logicMetas?.reactions || []) {
      switch (reactionMeta.type) {
        case ReactionType.Start:
          //start只有一个端口，所以name可以跟meta name一样
          this.inputs.push(new Jointer(reactionMeta.id, reactionMeta.name || "input"));
          break;
        case ReactionType.End:
          //end 只有一个端口，所以name可以跟meta name一样
          this.outputs.push(new Jointer(reactionMeta.id, reactionMeta.name || "output"));
          break;
        case ReactionType.SingleReaction:
        case ReactionType.ControllerDefaultReaction:
        case ReactionType.ControllerReaction:
          //拿到 material的目的是为了拿到上面的 reaction factory
          const material = this.getMaterial(reactionMeta.materialName)
          if (material?.reaction) {
            //通过material上的 reation factory 生成reaction节点
            this.reactions.push(material.reaction(reactionMeta, this.options))
          }
          break;
      }
    }
  }

  //连接一个图的所有节点，把所有的jointer连起来
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
