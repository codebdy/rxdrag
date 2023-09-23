import { ResizableColumn } from "@rxdrag/react-antd-shell"
import { memo } from "react"
import styled from "styled-components"

const StyledColumn = styled(ResizableColumn)`
  border-left: solid 1px ${props => props.theme.token?.colorBorderSecondary};
`

const Title = styled.div`
  display: flex;
  height: 40px;
  border-bottom: solid 1px ${props => props.theme.token?.colorBorderSecondary};
  align-items: center;
  padding: 0 16px;
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
      </Title>
    </StyledColumn>
  )
})