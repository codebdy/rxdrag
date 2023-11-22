import { ActivityResource } from "@rxdrag/minions-logicflow-editor"
import { IActivityMaterial } from "@rxdrag/minions-schema"
import { createId } from "@rxdrag/shared"
import { ReactionableNode } from "."
import { DraggableText } from "../DraggableText"
import { ThunderboltOutlined } from "@ant-design/icons"
import { listenPropMaterial } from "@rxdrag/minions-react-materials"

export function getListenPropNode(rNode: ReactionableNode) {
  const ctrlMeta = rNode.node.meta?.["x-controller"]
  const title = ctrlMeta?.name || rNode.node.title;

  return {
    key: rNode.node.id + "listenProps",
    title: <ActivityResource
      material={listenPropMaterial as IActivityMaterial<React.ReactNode>}
      createNode={() => {
        return {
          id: createId(),
          label: title,
          type: listenPropMaterial.activityType,
          activityName: listenPropMaterial.activityName,
          outPorts: [
            {
              id: createId(),
              name: "output",
            },
          ],
          config: {
            controllerId: ctrlMeta?.id
          }
        }
      }}
    >
      {
        (onStartDrag) => {
          return <DraggableText onMouseDown={onStartDrag}>
            属性变化
          </DraggableText>
        }
      }
    </ActivityResource>,
    isLeaf: true,
    icon: <ThunderboltOutlined />
  }
}