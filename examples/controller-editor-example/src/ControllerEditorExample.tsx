import { memo, useCallback, useState } from "react"
import { ControllerMetaEditorAntd5 } from "@rxdrag/controller-editor-antd5"
import { ILogicFlowControllerMeta } from "@rxdrag/minions-runtime-react"
import { activityMaterialLocales } from "@rxdrag/minions-react-materials"
import { Fieldy } from "@rxdrag/react-fieldy"
import { activityMaterialCategories } from "./materials"
import { ShellContainer } from "./components/ShellContainer"
import styled from "styled-components"
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

export const ControllerEditorExample = memo(() => {
  const [inputValue, setInputValue] = useState<ILogicFlowControllerMeta>({
    id: "test",
    "controllerType": "logicFlow",
    name: "测试",
    events: [],
    reactions: [],
    variables: [],
  })

  const handleChange = useCallback((meta?: ILogicFlowControllerMeta) => {
    setInputValue(meta || inputValue)
  }, [inputValue]);


  return (
    <Fieldy>
      <ShellContainer>
        <Toolbar>
          <Logo title="控制器" />
          <MenuButton />
        </Toolbar>
        <ControllerMetaEditorAntd5
          value={inputValue}
          onChange={handleChange}
          controllerMetas={[inputValue]}
          materialCategories={activityMaterialCategories}
          locales={activityMaterialLocales}
          eventMetas={[
            {
              name: "event1",
              label: "事件1"
            },
            {
              name: "event2",
              label: "事件2"
            },
            {
              name: "event3",
              label: "事件3"
            },
          ]}
          height={"100%"}
        />
      </ShellContainer>
    </Fieldy>
  )
})