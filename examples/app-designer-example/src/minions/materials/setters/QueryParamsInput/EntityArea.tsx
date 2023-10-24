import { memo, useCallback } from "react"
import { EntityMeta } from "../../../../FrontendDesigner/ModuleUiDesigner/interfaces/EntityMeta"
import styled from "styled-components"
import { Checkbox } from "antd"
import { AssociationArea } from "./AssociationArea"
import { IAssociationParam, IQureyEnitiyParam } from "../../../activities/common/IEntityQueryConfig"

const AttributeItem = styled.div`
  display: flex;
  padding: 4px 8px;
`

export const EntityArea = memo((
  props: {
    entity?: EntityMeta,
    value?: IQureyEnitiyParam,
    onChange?: (value: IQureyEnitiyParam) => void
  }
) => {
  const { entity, value, onChange } = props;

  const handleToggleAttribute = useCallback((id: string) => {
    const newAttrs = value?.attributes?.find(attId => attId === id)
      ? value?.attributes?.filter(attId => attId !== id)
      : [...value?.attributes || [], id]
    onChange?.({ ...value, attributes: newAttrs })
  }, [onChange, value])

  const handleRemove = useCallback((id: string) => {
    onChange?.({ ...value, associations: value?.associations?.filter(asso => asso.assoId !== id) })
  }, [onChange, value])

  const handleChange = useCallback((assoParams: IAssociationParam) => {
    const newAssos = value?.associations?.map(asso => asso.assoId === assoParams.assoId ? assoParams : asso) || [assoParams]
    onChange?.({ ...value, associations: newAssos })
  }, [onChange, value])

  const handleAdd = useCallback((assoParams: IAssociationParam) => {
    onChange?.({ ...value, associations: [...value?.associations || [], assoParams] })
  }, [onChange, value])

  return (
    <>
      {
        entity?.attributes?.map(attr => {
          return (
            <AttributeItem key={attr.uuid}>
              <Checkbox
                checked={!!value?.attributes?.find(id => id === attr.uuid)}
                onChange={() => handleToggleAttribute(attr.uuid)}
              >
                {attr.label || attr.name}
              </Checkbox>
            </AttributeItem>
          )
        })
      }
      {
        entity?.associations?.map(asso => {
          return (
            <AssociationArea
              key={asso.id}
              asso={asso}
              value={value?.associations?.find(assoc => assoc.assoId === asso.id)}
              onRemove={handleRemove}
              onChange={handleChange}
              onAdd={handleAdd}
            />
          )
        })
      }
    </>
  )
})