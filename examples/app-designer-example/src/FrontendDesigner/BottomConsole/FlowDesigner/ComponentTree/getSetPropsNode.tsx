import { ActivityResource, IActivityNode } from "@rxdrag/minions-logicflow-editor"
import { IPropConfig } from "@rxdrag/minions-runtime-react"
import { IActivityMaterial } from "@rxdrag/minions-schema"
import { createId } from "@rxdrag/shared"
import { ReactionableNode } from "."
import { setPropMaterial } from "../../minion-materials/controller/setProp"
import { methodIcon } from "../../minion-materials/icons"
import { DraggableText } from "../DraggableText"

export function getSetPropsNode(rNode: ReactionableNode){
  const ctrlMeta = rNode.node.meta?.["x-controller"]
  
  return {
    key: rNode.node.id + "setprops",
    title: <ActivityResource
      material={setPropMaterial as IActivityMaterial<React.ReactNode>}
      createNode={() => {
        const node: IActivityNode<IPropConfig> = {
          id: createId(),
          //label: title,
          type: setPropMaterial.activityType,
          activityName: setPropMaterial.activityName,
          inPorts: [
            {
              id: createId(),
              name: "input",
              label: "$props",
            },
          ],
          outPorts: [
            {
              id: createId(),
              name: "output",
              label: "",
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
            设置属性
          </DraggableText>
        }
      }
    </ActivityResource>,
    isLeaf: true,
    icon: methodIcon,
  }
}