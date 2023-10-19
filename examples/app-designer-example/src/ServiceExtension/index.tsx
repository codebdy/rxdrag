import { ResizableColumn } from "@rxdrag/react-shared"
import { memo, useState } from "react"
import styled from "styled-components"
import { LogicTree } from "./LogicTree"
import { MetaContext } from "./contexts"
import { useQueryAppMeta } from "../hooks/useQueryAppMeta"
import { ScriptEditor } from "./ScriptEditor"
import { ID } from "@rxdrag/shared"

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-flow: row;
  height: 0;
  .model-tree-shell{
    flex:1;
    display: flex;
    flex-flow: column;
    background-color: ${props => props.theme.token?.colorBgBase};
    border: solid 1px ${props => props.theme.token?.colorBorder};
    border-left: 0;
    height: 0;
    overflow: auto;
  }

  box-sizing: border-box;
`
const LeftColumn = styled(ResizableColumn)`
  border: solid 1px;
`

export const ServiceExtension = memo(() => {
  const [selectedLogicFlow, setSelectedLogicFlow] = useState<ID>();
  const [selectedScript, setSelectedScript] = useState<ID>();

  const { meta } = useQueryAppMeta("app1")

  return (
    <MetaContext.Provider value={meta?.publishedContent}>
      <Container>
        <LeftColumn minWidth={50} maxWidth={500} width={260}>
          <div className="model-tree-shell">
            <LogicTree
              selectedScript={selectedScript}
              selectedLogicFlow={selectedLogicFlow}
              onSelectLogicFlow={setSelectedLogicFlow}
              onSelectScript={setSelectedScript}
            />
          </div>
        </LeftColumn>
        <ScriptEditor id={selectedScript} />
      </Container>
    </MetaContext.Provider>
  )
})