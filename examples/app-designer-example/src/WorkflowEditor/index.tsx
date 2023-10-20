import { ResizableColumn } from "@rxdrag/react-shared"
import { memo, useState } from "react"
import styled from "styled-components"
import ProcessList from "./ProcessList"
import { ID } from "@rxdrag/shared"
import { ProcessEditor } from "./ProcessEditor"

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-flow: row;
  height: 0;
  box-sizing: border-box;
`

export const WorkflowEditor = memo(() => {
  const [selected, setSelected] = useState<ID>()
  return (<Container>
    <ResizableColumn minWidth={50} maxWidth={500} width={260}>
      <ProcessList
        selected={selected}
        onSelectChange={setSelected}
      />
    </ResizableColumn>
    <ProcessEditor id={selected} />
  </Container>)
})