import { IActivity, IActivityJointers } from "../interfaces";
import { ActivityJointers } from "./ActivityJointer";
import { Jointer } from "./Jointer";
import { ActivityType, IActivityDefine, ILineDefine, ILogicFlowDefine, ILogicFlowMetas } from "@rxdrag/minions-schema"
import { activities } from "./activities";

export class LogicFlow<LogicFlowContext = unknown> {
  id: string;
  jointers: IActivityJointers = new ActivityJointers();
  activities: IActivity[] = [];
  rootNodes: IActivityDefine<unknown>[] = [];
  rootLines: ILineDefine[] = [];

  constructor(private flowMeta: ILogicFlowDefine, private context: LogicFlowContext) {
    for (const node of flowMeta.nodes) {
      if (!node.parentId) {
        this.rootNodes.push(node)
      }
    }

    for (const line of flowMeta.lines) {
      if (!this.getNode(line.source.nodeId)?.parentId && this.getNode(line.target.nodeId)?.parentId) {
        this.rootLines.push(line)
      }
    }

    //注意这个id的处理
    this.id = flowMeta.id

    //第一步，解析节点
    this.constructActivities()

    //第二步， 构建连接关系
    this.contructLines()
  }

  getNode = (id: string) => {
    return this.flowMeta?.nodes?.find(node => node.id === id)
  }

  getNodeChildren = (id: string) => {
    const children: ILogicFlowMetas = {
      lines: [],
      nodes: []
    }
    for (const node of this.flowMeta.nodes) {
      if (node.parentId === id) {
        //子节点删除parentId，方便使用同一个处理逻辑解析代码
        children.nodes.push({ ...node, parentId: undefined })
      }
    }
    //父节点的input创建为start, portId=>start 节点 id
    //父节点的output创建为end, portId=>end 节点 id
    const groupNode = this.getNode(id)
    for (const input of groupNode?.inPorts || []) {
      children.nodes.push({ id: input.id, type: ActivityType.Start, activityName: "start" })
    }
    for (const output of groupNode?.outPorts || []) {
      children.nodes.push({ id: output.id, type: ActivityType.End, activityName: "end" })
    }

    for (const line of this.flowMeta.lines) {
      if (this.getNode(line.source.nodeId)?.parentId === id ||
        this.getNode(line.target.nodeId)?.parentId === id) {
        children.lines.push(line)
      }
      let newLine = line
      //source为父节点input
      if (line.source.nodeId === id && line.source.portId) {
        newLine = {...newLine,  source: { nodeId: line.source.portId }}
      }

      //target为父节点output
      if (line.target.nodeId === id  && line.target.portId) {
        newLine = {...newLine,  target: { nodeId: line.target.portId } }
      }

      //如果节点产生变化，意味着起点或终点连接到group的端口
      if(newLine !== line){
        children.lines.push(newLine)
      }
    }

    return children
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
    for (const activityMeta of this.rootNodes) {
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
        case ActivityType.EmbeddedFlow:
        case ActivityType.LogicFlowActivity:
          if (activityMeta.activityName) {
            const activityInfo = activities[activityMeta.activityName]
            const activityClass = activityInfo?.target
            if (!activityClass) {
              throw new Error("Can not find activity by name:" + activityMeta.activityName)
            }
            let newMeta = activityMeta
            if (activityMeta.type === ActivityType.EmbeddedFlow) {
              newMeta = { ...activityMeta, children: this.getNodeChildren(activityMeta.id) }
            }
            const activity = new activityClass(newMeta, this.context);

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
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const handle = (activity as any)?.[handleName];
              const handleWithThis = handle?.bind(activity);
              handleName && activity.jointers.getInput(inputName)?.connect(handleWithThis)
            }

            //处理动态端口
            if (activityInfo.dynamicMethod) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    for (const lineMeta of this.rootLines) {
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
