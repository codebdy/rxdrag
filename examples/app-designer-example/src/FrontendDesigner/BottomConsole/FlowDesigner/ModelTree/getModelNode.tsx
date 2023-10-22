import { ActivityResource } from "@rxdrag/minions-logicflow-editor"
import { IActivityMaterial } from "@rxdrag/minions-schema"
import { DraggableText } from "../DraggableText"
import { ClassMeta } from "@rxdrag/uml-schema"

export function getModelNode(
  cls: ClassMeta,
  meterial: IActivityMaterial<React.ReactNode>,
  key: string,
) {

  return {
    key: cls.uuid + key,
    title: <ActivityResource
      material={meterial}
      config={{
        entityId: cls.uuid
      }}
    >
      {
        (onStartDrag) => {
          return <DraggableText onMouseDown={onStartDrag}>
            {meterial.label}
          </DraggableText>
        }
      }
    </ActivityResource>,
    isLeaf: true,
    icon: meterial.icon
  }
}