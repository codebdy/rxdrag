import { memo, useCallback, useState } from "react"
import { AssociationMeta } from "../../../../FrontendDesigner/ModuleUiDesigner/interfaces/AssociationMeta"
import { associationIcon } from "@rxdrag/react-shared"
import { Space, Checkbox } from "antd"
import styled from "styled-components"
import { useEnitity } from "../../../../FrontendDesigner/hooks/useEnitity"
import { EntityArea } from "./EntityArea"
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { PropertiesArea } from "./PropertiesArea"
import { ExprssionDrawer } from "./ExprssionDrawer"
import { IAssociationParam, IQureyEnitiyParam } from "../../../activities/common/IEntityQueryConfig"
import { IExpression, IExpressionGroup } from "../../../activities/common/interfaces"
import { SortPopover } from "./SortPopover"

const Container = styled.div`
  display: flex;
  flex-flow: column;
`

const EntityPropsArea = styled(PropertiesArea)`
  margin-left: 40px;
`

const RelationIcon = styled.div`
  font-size: 14px;
  margin-right: 8px;
`

const AssociationItem = styled.div`
  display: flex;
  padding: 4px 8px;
`

const AssociationName = styled.div`
  display: flex;
  align-items: center;
`

export const AssociationArea = memo((
  props: {
    asso: AssociationMeta,
    value?: IAssociationParam,
    onRemove?: (id: string) => void,
    onChange?: (assoParams: IAssociationParam) => void,
    onAdd?: (assoParams: IAssociationParam) => void,
  }
) => {
  const { asso, value, onRemove, onChange, onAdd } = props;
  const [selected, setSelected] = useState<boolean>()
  const entity = useEnitity(asso.typeId)

  const handleCheckedChange = useCallback((e: CheckboxChangeEvent) => {
    setSelected(e.target?.checked)
    if (!e.target?.checked) {
      onRemove?.(asso.id)
    } else {
      onAdd?.({ assoId: asso.id })
    }
  }, [asso.id, onAdd, onRemove])

  const handleExpressionChange = useCallback((exprs?: (IExpression | IExpressionGroup)[]) => {
    onChange?.({ ...value, assoId: asso.id, expressions: exprs })
  }, [asso.id, onChange, value])

  const handlePropsChange = useCallback((params?: IQureyEnitiyParam) => {
    onChange?.({ ...params, assoId: asso.id })
  }, [asso.id, onChange])

  return (
    <Container>
      <AssociationItem key={asso.id}>
        <Space>
          <Checkbox
            checked={selected}
            onChange={handleCheckedChange}
          >
            <AssociationName>
              <RelationIcon>
                {associationIcon}
              </RelationIcon>
              {asso.label || asso.name} : {entity?.label || entity?.name}
            </AssociationName>
          </Checkbox>
          {
            selected && <>
              <ExprssionDrawer
                entityId={asso.typeId}
                value={value?.expressions}
                onChange={handleExpressionChange}
              />
              <SortPopover />
            </>
          }
        </Space>
      </AssociationItem>
      {
        selected && <EntityPropsArea>
          <EntityArea
            entity={entity}
            value={value}
            onChange={handlePropsChange}
          />
        </EntityPropsArea>
      }

    </Container>

  )
})