import { IActivity, IActivityJointers } from "../interfaces";
import { ActivityJointers } from "./ActivityJointer";
import { Jointer } from "./Jointer";
import { ActivityType, ILogicFlowDefinition } from "@rxdrag/minions-schema"
import { activities } from "./activities";

export class LogicFlow<LogicFlowContext = unknown> {
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

  //构建一个图的所有节点
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
        case ActivityType.LogicFlowActivity:
          if (activityMeta.activityName) {
            const activityInfo = activities[activityMeta.activityName]
            const activityClass = activityInfo?.target
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

            //把input端口跟处理函数相连
            for (const inputName of Object.keys(activityInfo.methodMap)) {
              const handleName = activityInfo.methodMap[inputName]
              const handle = (activity as any)?.[handleName];
              const handleWithThis = handle?.bind(activity);
              handleName && activity.jointers.getInput(inputName)?.connect(handleWithThis)
            }

            //处理动态端口
            if (activityInfo.dynamicMethod) {
              const handle = (activity as any)?.[activityInfo.dynamicMethod];
              const handleWithThis = handle?.bind(activity);

              for (const input of activity.jointers.inputs) {
                const handeWraper = (inputValue: unknown) => {
                  return handleWithThis?.(input.name, inputValue)
                }
                input.connect(handeWraper)
              }
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
