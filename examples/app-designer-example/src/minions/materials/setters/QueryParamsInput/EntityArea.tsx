import { memo } from "react"
import { EntityMeta } from "../../../../FrontendDesigner/ModuleUiDesigner/interfaces/EntityMeta"
import styled from "styled-components"
import { Checkbox } from "antd"
import { AssociationArea } from "./AssociationArea"

const AttributeItem = styled.div`
  display: flex;
  padding: 4px 8px;
`

export const EntityArea = memo((
  props: {
    entity?: EntityMeta
  }
) => {
  const { entity } = props;
  return (
    <>
      {
        entity?.attributes?.map(attr => {
          return (
            <AttributeItem key={attr.uuid}>
              <Checkbox>
                {attr.label || attr.name}
              </Checkbox>
            </AttributeItem>
          )
        })
      }
      {
        entity?.associations?.map(asso => {
          return (
            <AssociationArea key={asso.id} asso={asso} />
          )
        })
      }
    </>
  )
})