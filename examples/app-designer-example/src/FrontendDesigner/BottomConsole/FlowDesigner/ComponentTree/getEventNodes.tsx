import { IMaterial } from "@rxdrag/react-core";
import { ReactionableNode } from ".";
import { ThunderboltOutlined } from "@ant-design/icons";
import { ActivityResource, IActivityNode } from "@rxdrag/minions-logicflow-editor";
import { IEventConfig } from "@rxdrag/minions-runtime-react";
import { IActivityMaterial } from "@rxdrag/minions-schema";
import { createId } from "@rxdrag/shared";
import { DraggableText } from "../DraggableText";
import { IDesignerEngine } from "@rxdrag/core";
import { eventMaterial } from "@rxdrag/minions-react-materials";
import { DEFAULT_OUTPUT_NAME } from "@rxdrag/minions-runtime";

export function getEventNodes(rNode: ReactionableNode, engine: IDesignerEngine | undefined, comMaterial?: IMaterial) {
  const ctrlMeta = rNode.node.meta?.["x-controller"]
  const t = (msg?: string) => {
    return msg?.startsWith("$")
      ? engine?.getLocalesManager().getComponentSettingsMessage(comMaterial?.componentName || "", msg?.substring(1))
      : msg
  }
  return comMaterial?.controller?.events?.map(event => {
    const label = t(event.label);

    return {
      key: rNode.node.id + event.name,
      title: <ActivityResource
        material={eventMaterial as IActivityMaterial<React.ReactNode>}
        createNode={() => {
          const node: IActivityNode<IEventConfig> = {
            id: createId(),
            //label: title,
            type: eventMaterial.activityType,
            activityName: eventMaterial.activityName,
            subLabel: label || "",
            outPorts: !event.args ? [
              {
                id: createId(),
                name: DEFAULT_OUTPUT_NAME,
              },
            ] : event.args.map(arg => ({
              id: createId(),
              name: arg.name,
              label: t(arg.label) || "",
            })),
            config: {
              controllerId: ctrlMeta?.id,
              name: event.name,
            }
          }

          return node
        }}
      >
        {
          (onStartDrag) => {
            return <DraggableText onMouseDown={onStartDrag}>
              {label}
            </DraggableText>
          }
        }
      </ActivityResource>,
      isLeaf: true,
      icon: <ThunderboltOutlined />,
    }
  }) || []
}