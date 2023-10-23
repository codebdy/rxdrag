import { memo } from "react"
import { AssociationMeta } from "../../../../FrontendDesigner/ModuleUiDesigner/interfaces/AssociationMeta"
import { FunctionOutlined } from "@ant-design/icons"
import { associationIcon, orderIcon } from "@rxdrag/react-shared"
import { Space, Checkbox, Button } from "antd"
import styled from "styled-components"

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
  return (
    <AssociationItem key={asso.id}>
      <Space>
        <Checkbox>
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
  )
})