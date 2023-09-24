import { ResizableColumn } from "@rxdrag/react-antd-shell"
import { memo } from "react"
import styled from "styled-components"
import { Title } from "../common/Title"
import { CloseOutlined } from "@ant-design/icons"
import { Button } from "antd"

const StyledColumn = styled(ResizableColumn)`
  border-left: solid 1px ${props => props.theme.token?.colorBorderSecondary};
`

export const PropertyPanel = memo(() => {
  return (
    <StyledColumn
      right
      width={260}
      maxWidth={500}
      minWidth={160}
    >
      <Title>
        属性
        <Button type="text" size="small" icon={<CloseOutlined />} />
      </Title>
    </StyledColumn>
  )
})