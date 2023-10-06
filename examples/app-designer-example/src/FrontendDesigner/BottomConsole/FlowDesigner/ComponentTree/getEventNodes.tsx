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

export function getEventNodes(rNode: ReactionableNode, engine: IDesignerEngine | undefined, comMaterial?: IMaterial) {
  const ctrlMeta = rNode.node.meta?.["x-controller"]
  return comMaterial?.controller?.events?.map(event => {
    const label = event.label.startsWith("$")
      ? engine?.getLocalesManager().getComponentSettingsMessage(comMaterial.componentName, event.label.substring(1))
      : event.label;
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
            outPorts: [
              {
                id: createId(),
                name: event.name,
                label: label || "",
              },
            ],
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