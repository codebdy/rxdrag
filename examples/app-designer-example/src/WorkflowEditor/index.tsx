import { ResizableColumn } from "@rxdrag/react-shared"
import { memo } from "react"
import styled from "styled-components"
import ProcessList from "./ProcessList"

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-flow: row;
  height: 0;
  box-sizing: border-box;
`

export const WorkflowEditor = memo(() => {
  return (<Container>
    <ResizableColumn minWidth={50} maxWidth={500} width={260}>
      <ProcessList />
    </ResizableColumn>
  </Container>)
})