import { memo, useCallback, useState } from "react"
import { ILogicMetas, LogicFlowEditorScope } from "@rxdrag/minions-logicflow-editor"
import { ConfigProvider, Form, theme } from "antd"
import { ExampleInner } from "components/ExampleInner"

export const Antd5Example = memo(() => {
  const [themeMode, setThemeMode] = useState<"dark" | "light">("light")
  const [inputValue, setInputValue] = useState<ILogicMetas>({
    nodes: [],
    lines: []
  })

  const handleChange = useCallback((meta?: ILogicMetas) => {
    setInputValue(meta || inputValue)
  }, [inputValue]);

  const handleToggleTheme = useCallback(() => {
    setThemeMode(mode => mode === "light" ? "dark" : "light")
  }, [])

  return (
    <ConfigProvider
      theme={{
        algorithm: themeMode === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm
      }}
    >
      <LogicFlowEditorScope>
        <ExampleInner toggleTheme={handleToggleTheme} />
      </LogicFlowEditorScope>
    </ConfigProvider>
  )
})