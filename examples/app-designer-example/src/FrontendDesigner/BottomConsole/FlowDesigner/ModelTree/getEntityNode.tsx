import { ActivityResource } from "@rxdrag/minions-logicflow-editor"
import { IActivityMaterial } from "@rxdrag/minions-schema"
import { DraggableText } from "../DraggableText"
import { ClassMeta } from "@rxdrag/uml-schema"
import { oneEntityIcon } from "@rxdrag/react-shared"
import { queryOneEntityMaterial } from "../../../../minions/materials/QueryOneEntity"

export function getEntityNode(cls: ClassMeta) {

  return {
    key: cls.uuid + "queryOne",
    title: <ActivityResource
      material={queryOneEntityMaterial as IActivityMaterial<React.ReactNode>}
      config={{
        entityId: cls.uuid
      }}
    >
      {
        (onStartDrag) => {
          return <DraggableText onMouseDown={onStartDrag}>
            读取单实体
          </DraggableText>
        }
      }
    </ActivityResource>,
    isLeaf: true,
    icon: oneEntityIcon
  }
}