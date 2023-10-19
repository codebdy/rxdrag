import { ResizableColumn } from "@rxdrag/react-shared"
import { memo } from "react"
import styled from "styled-components"
import { LogicTree } from "./LogicTree"
import { MetaContext } from "./contexts"
import { useQueryAppMeta } from "../hooks/useQueryAppMeta"

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-flow: row;
  .model-tree-shell{
    flex:1;
    display: flex;
    flex-flow: column;
    background-color: ${props => props.theme.token?.colorBgBase};
    border: solid 1px ${props => props.theme.token?.colorBorder};
    border-left: 0;
    height: 100%;
    overflow: auto;
  }

  box-sizing: border-box;
`
const LeftColumn = styled(ResizableColumn)`
  border: solid 1px;
`

export const ServiceExtension = memo(() => {
  const { meta } = useQueryAppMeta("app1")
  return (
    <MetaContext.Provider value={meta?.publishedContent}>
      <Container>
        <LeftColumn minWidth={50} maxWidth={500} width={260}>
          <div className="model-tree-shell">
            <LogicTree />
          </div>
        </LeftColumn>
      </Container>
    </MetaContext.Provider>
  )
})