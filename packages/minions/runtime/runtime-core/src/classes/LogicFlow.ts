import { IActivity, IActivityJointers } from "../interfaces";
import { ActivityJointers } from "./ActivityJointer";
import { Jointer } from "./Jointer";
import { ActivityType, ILogicFlowDefinition } from "@rxdrag/minions-schema"
import { activityConstructors } from "./activities";

export class LogicFlow<LogicFlowContext> {
  id: string;
  jointers: IActivityJointers = new ActivityJointers();
  activities: IActivity[] = [];
  constructor(private flowMeta: ILogicFlowDefinition, private context: LogicFlowContext) {

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
    this.jointers = new ActivityJointers();
  }

  //一个图的构建所有节点
  private constructActivities() {
    for (const activityMeta of this.flowMeta.nodes || []) {
      switch (activityMeta.type) {
        case ActivityType.Start:
          //start只有一个端口，所以name可以跟meta name一样
          this.jointers.inputs.push(new Jointer(activityMeta.id, activityMeta.activityName || "input"));
          break;
        case ActivityType.End:
          //end 只有一个端口，所以name可以跟meta name一样
          this.jointers.outputs.push(new Jointer(activityMeta.id, activityMeta.activityName || "output"));
          break;
        case ActivityType.Activity:
          if (activityMeta.activityName) {
            //通过material上的 reation factory 生成reaction节点
            const activityClass = activityConstructors[activityMeta.activityName]
            if (!activityClass) {
              throw new Error("Can not find activity by name:" + activityMeta.activityName)
            }
            const activity = new activityClass(activityMeta, this.context);

            //构造Jointers
            for (const out of activityMeta.outPorts || []) {
              activity.jointers.outputs.push(new Jointer(out.id, out.name))
            }
            for (const input of activityMeta.inPorts || []) {
              activity.jointers.inputs.push(new Jointer(input.id, input.name))
            }

            this.activities.push(activity)
          }
          break;
      }
    }
  }

  //连接一个图的所有节点，把所有的jointer连起来
  private contructLines() {
    for (const lineMeta of this.flowMeta.lines || []) {
      let sourceJointer = this.jointers.inputs.find(jointer => jointer.id === lineMeta.source.nodeId)
      if (!sourceJointer && lineMeta.source.portId) {
        sourceJointer = this.activities.find(reaction => reaction.id === lineMeta.source.nodeId)?.jointers?.outputs.find(output => output.id === lineMeta.source.portId)
      }

      if (!sourceJointer) {
        throw new Error("Can find source jointer")
      }

      let targetJointer = this.jointers.outputs.find(jointer => jointer.id === lineMeta.target.nodeId)
      if (!targetJointer && lineMeta.target.portId) {
        targetJointer = this.activities.find(reaction => reaction.id === lineMeta.target.nodeId)?.jointers?.inputs.find(input => input.id === lineMeta.target.portId)
      }

      if (!targetJointer) {
        throw new Error("Can find target jointer")
      }

      sourceJointer.connect(targetJointer.push)
    }
  }
}
