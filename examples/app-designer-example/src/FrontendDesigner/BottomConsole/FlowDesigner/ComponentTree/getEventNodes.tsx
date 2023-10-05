import { IMaterial } from "@rxdrag/react-core";
import { ReactionableNode } from ".";
import { ThunderboltOutlined } from "@ant-design/icons";
import { ActivityResource, IActivityNode } from "@rxdrag/minions-logicflow-editor";
import { IPropConfig } from "@rxdrag/minions-runtime-react";
import { IActivityMaterial } from "@rxdrag/minions-schema";
import { createId } from "@rxdrag/shared";
import { DraggableText } from "../DraggableText";
import { IDesignerEngine } from "@rxdrag/core";
import { eventMaterial } from "@rxdrag/minions-react-materials";

export function getEventNodes(rNode: ReactionableNode, engine:IDesignerEngine|undefined, comMaterial?: IMaterial) {
  const ctrlMeta = rNode.node.meta?.["x-controller"]
  return comMaterial?.controller?.events?.map(e => {
    const label = e.label.startsWith("$")
      ? engine?.getLocalesManager().getComponentSettingsMessage(comMaterial.componentName, e.label.substring(1))
      : e.label;
    return {
      key: rNode.node.id + e.name,
      title: <ActivityResource
        material={eventMaterial as IActivityMaterial<React.ReactNode>}
        createNode={() => {
          const node: IActivityNode<IPropConfig> = {
            id: createId(),
            //label: title,
            type: eventMaterial.activityType,
            activityName: eventMaterial.activityName,
            outPorts: [
              {
                id: createId(),
                name: e.name,
                label: label || "",
              },
            ],
            config: {
              param: {
                controllerId: ctrlMeta?.id
              }
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