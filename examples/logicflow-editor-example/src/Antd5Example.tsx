import { ShellContainer } from "components/ShellContainer"
import { memo, useCallback, useState } from "react"
import { Fieldy } from "@rxdrag/react-fieldy"
import { activityMaterialCategories } from "materials"
import { LogicFlowEditorAntd5 } from "@rxdrag/logicflow-editor-antd5"
import { ILogicMetas } from "@rxdrag/minions-logicflow-editor"
import { ConfigProvider, Form, theme } from "antd"
import { activityMaterialLocales } from "minion-materials"

export const Antd5Example = memo(() => {
  const [inputValue, setInputValue] = useState<ILogicMetas>({
    nodes: [],
    lines: []
  })

  const handleChange = useCallback((meta?: ILogicMetas) => {
    setInputValue(meta || inputValue)
  }, [inputValue]);


  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm
      }}
    >
      <Fieldy>
        <Form
          labelAlign="left"
          colon={false}
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 17 }}
          autoComplete="off"
          labelWrap={true}
          style={{
            flex: 1,
            height: '100%',
            display: "flex",
          }}
        >
          <ShellContainer>
            <LogicFlowEditorAntd5
              //value={inputValue}
              //onChange={handleChange}
              //controllerMetas={[inputValue]}
              materialCategories={activityMaterialCategories}
              locales={activityMaterialLocales}
              value={{
                nodes: [],
                lines: []
              }}
            // setters={{
            //   VariableSelect,
            //   PropSelect,
            //   ReactionSelect,
            // }}
            />
          </ShellContainer>
        </Form>
      </Fieldy>
    </ConfigProvider>
  )
})