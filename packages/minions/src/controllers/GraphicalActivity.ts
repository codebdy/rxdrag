import { IConfigMeta, IJointer, IActivity, ILogicFlowDefinition, IActivityDefine, ActivityType } from "@rxdrag/schema";
import { Jointer } from "../classes/jointer";
import { IActivityFactoryOptions } from "./IFactoryOptions";

export class GraphicalActivity implements IActivity {
  id: string;
  inputs: IJointer[] = [];
  outputs: IJointer[] = [];
  activities: IActivity[] = [];
  constructor(private defineMeta: ILogicFlowDefinition, private options: IActivityFactoryOptions, public meta?: IActivityDefine<IConfigMeta>) {
    //注意这个id的处理，自定reaction必须要用meta id，不能用defineMeta id
    this.id = meta?.id || defineMeta.id

    //第一步，解析节点
    this.constructActivities()

    //第二步， 构建连接关系
    this.contructRelations()
  }
  destory(): void {
    for (const activity of this.activities) {
      activity.destory()
    }
    this.activities = []
    this.outputs = []
    this.inputs = []
  }

  //一个图的构建所有节点
  private constructActivities() {
    for (const activityMeta of this.defineMeta.nodes || []) {
      switch (activityMeta.type) {
        case ActivityType.Start:
          //start只有一个端口，所以name可以跟meta name一样
          this.inputs.push(new Jointer(activityMeta.id, activityMeta.name || "input"));
          break;
        case ActivityType.End:
          //end 只有一个端口，所以name可以跟meta name一样
          this.outputs.push(new Jointer(activityMeta.id, activityMeta.name || "output"));
          break;
        case ActivityType.SingleActivity:
        case ActivityType.ControllerDefaultReaction:
        case ActivityType.ControllerReaction:
          //拿到 material的目的是为了拿到上面的 reaction factory
          const material = this.getMaterial(activityMeta.materialName)
          if (material?.reaction) {
            //通过material上的 reation factory 生成reaction节点
            this.activities.push(material.reaction(activityMeta, this.options))
          }
          break;
      }
    }
  }

  //连接一个图的所有节点，把所有的jointer连起来
  private contructRelations() {
    for (const lineMeta of this.defineMeta.lines || []) {
      let sourceJointer = this.inputs.find(jointer => jointer.id === lineMeta.source.nodeId)
      if (!sourceJointer && lineMeta.source.portId) {
        sourceJointer = this.activities.find(reaction => reaction.id === lineMeta.source.nodeId)?.outputs.find(output => output.id === lineMeta.source.portId)
      }

      if (!sourceJointer) {
        throw new Error("Can find source jointer")
      }

      let targetJointer = this.outputs.find(jointer => jointer.id === lineMeta.target.nodeId)
      if (!targetJointer && lineMeta.target.portId) {
        targetJointer = this.activities.find(reaction => reaction.id === lineMeta.target.nodeId)?.inputs.find(input => input.id === lineMeta.target.portId)
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
