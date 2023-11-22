import { IActivity, IActivityJointers } from "../interfaces";
import { ActivityJointers } from "./ActivityJointers";
import { Jointer } from "./Jointer";
import { NodeType, INodeDefine, ILogicFlowDefine, ILogicFlowMetas } from "@rxdrag/minions-schema"
import { activities } from "./activities";

export class LogicFlow<LogicFlowContext = unknown> {
  id: string;
  jointers: IActivityJointers = new ActivityJointers();
  activities: IActivity[] = [];

  constructor(private flowDefine: ILogicFlowDefine, private context: LogicFlowContext) {
    //注意这个id的处理
    this.id = flowDefine.id

    //第一步，解析节点
    this.constructActivities()

    //第二步， 构建连接关系
    this.contactLines()

    //第三步，初始化需要初始化的节点
    for (const activity of this.activities) {
      activity?.init?.()
    }
  }

  destroy(): void {
    for (const activity of this.activities) {
      activity.destroy()
    }
    this.activities = []
    this.jointers = new ActivityJointers();
  }

  //构建一个图的所有节点
  private constructActivities() {
    for (const activityMeta of this.flowDefine.metas?.nodes || []) {
      switch (activityMeta.type) {
        case NodeType.Start: {
          //start只有一个端口，可能会变成其它流程的端口，所以name谨慎处理
          this.jointers.addInput(new Jointer(activityMeta.id, activityMeta.name || "input"));
          break;
        }
        case NodeType.End: {
          //end 只有一个端口，可能会变成其它流程的端口，所以name谨慎处理
          const endJointer = new Jointer(activityMeta.id, activityMeta.name || "output");
          // 上下文中有回调事件时执行
          endJointer.connect((inputValue, runContext?: {asyncBack?:(isError: boolean, data: unknown) => void}) => {
            if (endJointer['outlets']?.length === 1 && runContext?.asyncBack) {
              runContext.asyncBack(false, inputValue)
            }
          })
          this.jointers.addOutput(endJointer);
          break;
        }
        case NodeType.Activity:
        case NodeType.EmbeddedFlow:
        case NodeType.LogicFlowActivity: {
          if (activityMeta.activityName) {
            const activityInfo = activities[activityMeta.activityName]
            const activityClass = activityInfo?.target
            if (!activityClass) {
              throw new Error("Can not find activity by name:" + activityMeta.activityName)
            }
            let newMeta = activityMeta
            if (activityMeta.type === NodeType.EmbeddedFlow) {
              //重新构造子节点，主要目的：把父节点端口转换成子流程的开始节点跟结束节点
              newMeta = this.refactorChildren(activityMeta)
            }
            const activity = new activityClass(newMeta, this.context);

            //子编排不需要在这里构建端口
            if (activityMeta.type !== NodeType.LogicFlowActivity) {
              //构造Jointers
              for (const out of activityMeta.outPorts || []) {
                activity.jointers.addOutput(new Jointer(out.id, out.name))
              }
              for (const input of activityMeta.inPorts || []) {
                activity.jointers.addInput(new Jointer(input.id, input.name))
              }
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

              for (const input of activity.jointers.getInputs()) {
                const handleWrapper = (inputValue: unknown) => {
                  return handleWithThis?.(input.name, inputValue)
                }
                input.connect(handleWrapper)
              }
            }

            this.activities.push(activity)
          }
          break;
        }
      }
    }
  }

  //连接一个图的所有节点，把所有的jointer连起来
  private contactLines() {
    for (const lineMeta of this.flowDefine.metas?.lines || []) {
      let sourceJointer = this.jointers.getInputs().find(jointer => jointer.id === lineMeta.source.nodeId)
      if (!sourceJointer && lineMeta.source.portId) {
        sourceJointer = this.activities.find(reaction => reaction.id === lineMeta.source.nodeId)?.jointers?.getOutputs().find(output => output.id === lineMeta.source.portId)
      }
      if (!sourceJointer) {
        throw new Error("Can find source jointer")
      }

      let targetJointer = this.jointers.getOutputs().find(jointer => jointer.id === lineMeta.target.nodeId)
      if (!targetJointer && lineMeta.target.portId) {
        targetJointer = this.activities.find(reaction => reaction.id === lineMeta.target.nodeId)?.jointers?.getInputs().find(input => input.id === lineMeta.target.portId)
      }

      if (!targetJointer) {
        throw new Error("Can find target jointer")
      }
      sourceJointer.connect(targetJointer.push)
    }
  }

  getNode = (id: string) => {
    return this.flowDefine?.metas?.nodes?.find(node => node.id === id)
  }

  //重新构造children，添加边界节点，修改连线
  refactorChildren = (parentNode: INodeDefine) => {
    const children: ILogicFlowMetas = {
      lines: [],//连线重新整理
      nodes: [...parentNode?.children?.nodes || []],//节点全部纳入
    }

    //父节点的input创建为start, portId=>start 节点 id
    for (const input of parentNode?.inPorts || []) {
      children.nodes.push({ id: input.id, type: NodeType.Start, activityName: "start", name: input.name })
    }

    //父节点的output创建为end, portId=>end 节点 id
    for (const output of parentNode?.outPorts || []) {
      children.nodes.push({ id: output.id, type: NodeType.End, activityName: "end", name: output.name })
    }

    for (const line of parentNode?.children?.lines || []) {
      let newLine = line
      //起点是父节点输入端口， 连接到新创建的开始节点
      if (line.source.nodeId === parentNode.id && line.source.portId) {
        newLine = { ...line, source: { nodeId: line.source.portId } }
      }
      //终点是父节点输入端口, 连接到新创建的结束节点
      if (line.target.nodeId === parentNode.id && line.target.portId) {
        newLine = { ...newLine, target: { nodeId: line.target.portId } }
      }
      children.lines.push(newLine)
    }

    return { ...parentNode, children }
  }
}
