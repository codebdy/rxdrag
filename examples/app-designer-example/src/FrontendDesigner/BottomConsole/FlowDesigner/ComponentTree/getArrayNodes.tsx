import { IControllerConfig } from "@rxdrag/minions-runtime-react";
import { ReactionableNode } from ".";
import { ActivityResource, IActivityNode } from "@rxdrag/minions-logicflow-editor";
import { IActivityMaterial } from "@rxdrag/minions-schema";
import { createId } from "@rxdrag/shared";
import { readIndexMaterial, readRowMaterial } from "../../minion-materials/array";
import { methodIcon } from "../../minion-materials/icons";
import { DraggableText } from "../DraggableText";

export function getArrayNodes(rNode: ReactionableNode, isInArray: boolean) {
  const ctrlMeta = rNode.node.meta?.["x-controller"]
  return isInArray
    ? [
      {
        key: rNode.node.id + "readIndex",
        title: <ActivityResource
          material={readIndexMaterial as IActivityMaterial<React.ReactNode>}
          createNode={() => {
            const node: IActivityNode<IControllerConfig> = {
              id: createId(),
              //label: title,
              type: readIndexMaterial.activityType,
              activityName: readIndexMaterial.activityName,
              ...readIndexMaterial.defaultPorts,
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
                当前索引
              </DraggableText>
            }
          }
        </ActivityResource>,
        isLeaf: true,
        icon: methodIcon,
      },

      {
        key: rNode.node.id + "readRow",
        title: <ActivityResource
          material={readRowMaterial as IActivityMaterial<React.ReactNode>}
          createNode={() => {
            const node: IActivityNode<IControllerConfig> = {
              id: createId(),
              //label: title,
              type: readRowMaterial.activityType,
              activityName: readRowMaterial.activityName,
              ...readRowMaterial.defaultPorts,
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
                当前行
              </DraggableText>
            }
          }
        </ActivityResource>,
        isLeaf: true,
        icon: methodIcon,
      }
    ]
    : []
}