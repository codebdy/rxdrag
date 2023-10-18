import { ResizableColumn } from "@rxdrag/react-shared"
import { memo } from "react"
import styled from "styled-components"

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-flow: row;
  .model-tree-shell{
    display: flex;
    flex-flow: column;
    background-color: ${props => props.theme.token?.colorBgBase};
    border-right: solid 1px ${props => props.theme.token?.colorBorder};
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  box-sizing: border-box;
`
const LeftColumn = styled(ResizableColumn)`
  border: solid 1px;
`

export const ServiceExtension = memo(() => {
  return (
    <Container>
      <LeftColumn minWidth={50} maxWidth={500} width={260}>
        <div className="model-tree-shell">
          ddd
        </div>
      </LeftColumn>
    </Container>
  )
})