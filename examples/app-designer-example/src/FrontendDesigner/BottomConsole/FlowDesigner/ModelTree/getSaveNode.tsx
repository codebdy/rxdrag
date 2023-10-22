import { ActivityResource } from "@rxdrag/minions-logicflow-editor"
import { IActivityMaterial } from "@rxdrag/minions-schema"
import { DraggableText } from "../DraggableText"
import { ClassMeta } from "@rxdrag/uml-schema"
import { saveEntityIcon } from "@rxdrag/react-shared"
import { saveEntityMaterial } from "../../../../minions/materials/SaveEntity"

export function getSaveNode(cls: ClassMeta) {

  return {
    key: cls.uuid + "saveEntity",
    title: <ActivityResource
      material={saveEntityMaterial as IActivityMaterial<React.ReactNode>}
      config={{
        entityId: cls.uuid
      }}
    >
      {
        (onStartDrag) => {
          return <DraggableText onMouseDown={onStartDrag}>
            保存实体
          </DraggableText>
        }
      }
    </ActivityResource>,
    isLeaf: true,
    icon: saveEntityIcon
  }
}