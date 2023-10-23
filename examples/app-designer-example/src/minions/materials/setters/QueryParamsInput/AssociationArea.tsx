import { memo, useCallback, useState } from "react"
import { AssociationMeta } from "../../../../FrontendDesigner/ModuleUiDesigner/interfaces/AssociationMeta"
import { FunctionOutlined } from "@ant-design/icons"
import { associationIcon, orderIcon } from "@rxdrag/react-shared"
import { Space, Checkbox, Button } from "antd"
import styled from "styled-components"
import { useEnitity } from "../../../../FrontendDesigner/hooks/useEnitity"
import { EntityArea } from "./EntityArea"
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

const Container = styled.div`
  display: flex;
  flex-flow: column;
`

const PropertiesArea = styled.div`
  margin-left: 40px;
  display: flex;
  flex-flow: column;
  box-sizing: border-box;
  border-left: solid 1px ${props => props.theme.token?.colorBorder};
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
    asso: AssociationMeta
  }
) => {
  const { asso } = props;
  const [selected, setSelected] = useState<boolean>()
  const entity = useEnitity(asso.typeId)

  const handleCheckedChange = useCallback((e: CheckboxChangeEvent) => {
    setSelected(e.target?.checked)
  }, [])

  return (
    <Container>
      <AssociationItem key={asso.id}>
        <Space>
          <Checkbox checked={selected} onChange={handleCheckedChange}>
            <AssociationName>
              <RelationIcon>
                {associationIcon}
              </RelationIcon>
              {asso.label || asso.name}
            </AssociationName>
          </Checkbox>
          <Button type="text" size="small" icon={<FunctionOutlined />}></Button>
          <Button type="text" size="small" icon={orderIcon}></Button>
        </Space>
      </AssociationItem>
      {
        selected && <PropertiesArea>
          <EntityArea entity={entity} />
        </PropertiesArea>
      }

    </Container>

  )
})