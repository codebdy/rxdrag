import { memo, useState } from "react"
import { Fieldy } from "@rxdrag/react-fieldy"
import { activityMaterialCategories } from "../materials"
import { LogicFlowEditorAntd5 } from "@rxdrag/logicflow-editor-antd5"
import { ILogicMetas } from "@rxdrag/minions-logicflow-editor"
import styled from "styled-components"
import { Button, Space } from "antd"
import metas from "./meta.json"
import { ShellContainer } from "./ShellContainer"
import { activityMaterialLocales } from "../minion-materials"
import { Logo, MenuButton } from "example-common"

const Toolbar = styled.div`
  height: 48px;
  border-bottom: solid 1px ${props => props.theme.token?.colorBorder};
  display: flex;
  align-items: center;
  padding: 8px;
  justify-content: space-between;
  box-sizing: border-box;
  flex-grow: 0;
`

export const ExampleInner = memo((
  props: {
    toggleTheme: () => void
  }
) => {
  const { toggleTheme } = props
  const [inputValue, setInputValue] = useState<ILogicMetas>(metas as any)

  return (
    <Fieldy>
      <ShellContainer>
        <Toolbar>
          <Space>
            <Logo title="逻辑编排" />
            <Button onClick={toggleTheme}>主题切换</Button>
          </Space>
          <MenuButton />
        </Toolbar>
        <LogicFlowEditorAntd5
          value={inputValue}
          //token={token}
          //onChange={handleChange}
          //controllerMetas={[inputValue]}
          materialCategories={activityMaterialCategories}
          locales={activityMaterialLocales}
        />
      </ShellContainer>
    </Fieldy>
  )
})