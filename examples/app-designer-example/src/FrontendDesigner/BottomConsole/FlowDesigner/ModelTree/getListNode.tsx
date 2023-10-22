import { ActivityResource } from "@rxdrag/minions-logicflow-editor"
import { IActivityMaterial } from "@rxdrag/minions-schema"
import { createId } from "@rxdrag/shared"
import { DraggableText } from "../DraggableText"
import { ThunderboltOutlined } from "@ant-design/icons"
import { listenPropMaterial } from "@rxdrag/minions-react-materials"
import { ClassMeta } from "@rxdrag/uml-schema"
import { queryEntitiesMaterial } from "../../../../minions/materials/QueryEntities"

export function getListNode(cls: ClassMeta) {
  const title = cls.label || cls.name;

  return {
    key: cls.uuid + "queryList",
    title: <ActivityResource
      material={queryEntitiesMaterial as IActivityMaterial<React.ReactNode>}
      createNode={() => {
        return {
          id: createId(),
          label: title,
          type: queryEntitiesMaterial.activityType,
          activityName: queryEntitiesMaterial.activityName,
          outPorts: [
            {
              id: createId(),
              name: "output",
              label: "$propsChange",
            },
          ],
          config: {
            entityId: cls.uuid
          }
        }
      }}
    >
      {
        (onStartDrag) => {
          return <DraggableText onMouseDown={onStartDrag}>
            多实体查询
          </DraggableText>
        }
      }
    </ActivityResource>,
    isLeaf: true,
    icon: <ThunderboltOutlined />
  }
}