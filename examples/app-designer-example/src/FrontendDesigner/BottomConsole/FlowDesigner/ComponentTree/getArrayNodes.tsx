import { ReactionableNode } from ".";
import { ActivityResource } from "@rxdrag/minions-logicflow-editor";
import { IActivityMaterial } from "@rxdrag/minions-schema";
import { DraggableText } from "../DraggableText";
import { useTransMaterial } from "@rxdrag/logicflow-editor-antd5";
import { readIndexMaterial, readRowMaterial } from "@rxdrag/minions-react-materials";
import { methodIcon } from "@rxdrag/react-shared";
import { ControllerScopeType } from "@rxdrag/minions-runtime-react";

export function useGetArrayNodes(flowOwenerId?: string) {
  const t = useTransMaterial()
  const getArrayNodes = (rNode: ReactionableNode) => {
    const ctrlMeta = rNode.node.meta?.["x-controller"]
    if (flowOwenerId === ctrlMeta?.id) {
      if (ctrlMeta?.scopeType === ControllerScopeType.array) {
        return [
          {
            key: rNode.node.id + "readIndex",
            title: <ActivityResource
              material={t(readIndexMaterial as IActivityMaterial<React.ReactNode>)}
              config={
                {
                  controllerId: ctrlMeta?.id
                }
              }
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
              material={t(readRowMaterial as IActivityMaterial<React.ReactNode>)}
              config={
                {
                  controllerId: ctrlMeta?.id
                }
              }
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
      } else if (ctrlMeta?.scopeType === ControllerScopeType.tree) {
        return [
          {
            key: rNode.node.id + "readValue",
            title: <ActivityResource
              material={t(readRowMaterial as IActivityMaterial<React.ReactNode>)}
              config={
                {
                  controllerId: ctrlMeta?.id
                }
              }
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
      }
    }

    return []
  }

  return getArrayNodes
}
