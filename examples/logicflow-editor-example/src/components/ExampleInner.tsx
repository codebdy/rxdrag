import { ShellContainer } from "normal/components/ShellContainer"
import { memo, useState } from "react"
import { Fieldy } from "@rxdrag/react-fieldy"
import { activityMaterialCategories } from "normal/materials"
import { LogicFlowEditorAntd5 } from "@rxdrag/logicflow-editor-antd5"
import { ILogicMetas, useRemoveSelected, useSelected } from "@rxdrag/minions-logicflow-editor"
import { activityMaterialLocales } from "minion-materials"
import styled from "styled-components"
import { Button, Space } from "antd"
import metas from "./meta.json"

const Toolbar = styled.div`
  height: 80px;
  border-bottom: solid 1px ${props => props.theme.token?.colorBorder};
  display: flex;
  align-items: center;
  padding: 8px;
`

export const ExampleInner = memo((
  props: {
    toggleTheme: () => void
  }
) => {
  const { toggleTheme } = props
  const [inputValue, setInputValue] = useState<ILogicMetas>(metas as any)

  const { selected } = useSelected()
  const handleRemove = useRemoveSelected()

  return (
    <Fieldy>
      <ShellContainer>
        <Toolbar>
          <Space>
            <Button onClick={toggleTheme}>主题切换</Button>
            <Button disabled={!selected} onClick={handleRemove}>删除</Button>
          </Space>
        </Toolbar>
        <LogicFlowEditorAntd5
          value={inputValue}
          //token={token}
          //onChange={handleChange}
          //controllerMetas={[inputValue]}
          materialCategories={activityMaterialCategories}
          locales={activityMaterialLocales}
        // setters={{
        //   VariableSelect,
        //   PropSelect,
        //   ReactionSelect,
        // }}
        />
      </ShellContainer>
    </Fieldy>
  )
})