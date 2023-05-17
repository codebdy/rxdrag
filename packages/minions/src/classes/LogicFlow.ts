import { IJointer, IActivity, IMinions } from "../interfaces";
import { Jointer } from "./Jointer";
import { ActivityType, ILogicFlowDefinition } from "@rxdrag/minions-schema"

export class LogicFlow<ActivityFactoryOptions> {
  id: string;
  inputs: IJointer[] = [];
  outputs: IJointer[] = [];
  activities: IActivity[] = [];
  constructor(private flowMeta: ILogicFlowDefinition, private options: ActivityFactoryOptions, private minions: IMinions) {
    //注意这个id的处理
    this.id = flowMeta.id

    //第一步，解析节点
    this.constructActivities()

    //第二步， 构建连接关系
    this.contructLines()
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
    for (const activityMeta of this.flowMeta.nodes || []) {
      switch (activityMeta.type) {
        case ActivityType.Start:
          //start只有一个端口，所以name可以跟meta name一样
          this.inputs.push(new Jointer(activityMeta.id, activityMeta.name || "input"));
          break;
        case ActivityType.End:
          //end 只有一个端口，所以name可以跟meta name一样
          this.outputs.push(new Jointer(activityMeta.id, activityMeta.name || "output"));
          break;
        case ActivityType.Activity:
          if (activityMeta.name) {
            //通过material上的 reation factory 生成reaction节点
            this.activities.push(this.minions.createActivity(activityMeta.name, this.options))
          }
          break;
      }
    }
  }

  //连接一个图的所有节点，把所有的jointer连起来
  private contructLines() {
    for (const lineMeta of this.flowMeta.lines || []) {
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

      sourceJointer.connect(targetJointer.push)
    }
  }
}
