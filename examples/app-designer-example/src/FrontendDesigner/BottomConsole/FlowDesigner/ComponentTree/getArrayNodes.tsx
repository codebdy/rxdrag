import { ReactionableNode } from ".";
import { ActivityResource } from "@rxdrag/minions-logicflow-editor";
import { IActivityMaterial } from "@rxdrag/minions-schema";
import { DraggableText } from "../DraggableText";
import { useTransMaterial } from "@rxdrag/logicflow-editor-antd5";
import { readIndexMaterial, methodIcon, readRowMaterial } from "@rxdrag/minions-react-materials";

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
