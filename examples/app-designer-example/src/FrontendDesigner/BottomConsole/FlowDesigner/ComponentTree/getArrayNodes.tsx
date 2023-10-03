import { ReactionableNode } from ".";
import { ActivityResource } from "@rxdrag/minions-logicflow-editor";
import { IActivityMaterial } from "@rxdrag/minions-schema";
import { methodIcon } from "../../minion-materials/icons";
import { DraggableText } from "../DraggableText";
import { readIndexMaterial } from "../../minion-materials/array/readIndex";
import { readRowMaterial } from "../../minion-materials/array/readRow";
import { useTransMaterial } from "@rxdrag/logicflow-editor-antd5";

export function useGetArrayNodes() {
  const t = useTransMaterial()
  const getArrayNodes = (rNode: ReactionableNode, isInArray: boolean) => {
    const ctrlMeta = rNode.node.meta?.["x-controller"]
    return isInArray
      ? [
        {
          key: rNode.node.id + "readIndex",
          title: <ActivityResource
            material={t(readIndexMaterial as IActivityMaterial<React.ReactNode>)}
            config={
              {
                param: {
                  controllerId: ctrlMeta?.id
                }
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
                param: {
                  controllerId: ctrlMeta?.id
                }
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
      : []
  }

  return getArrayNodes
}
