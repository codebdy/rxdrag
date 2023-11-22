import { memo, useCallback, useState } from "react"
import { ConfigProvider, theme } from "antd"
import { ExampleInner } from "./components/ExampleInner"

export const LogicflowEditorExample = memo(() => {
  const [themeMode, setThemeMode] = useState<"dark" | "light">("light")
  // const handleChange = useCallback((meta?: ILogicMetas) => {
  //   setInputValue(meta || inputValue)
  // }, [inputValue]);

  const handleToggleTheme = useCallback(() => {
    setThemeMode(mode => mode === "light" ? "dark" : "light")
  }, [])

  return (
    <ConfigProvider
      theme={{
        algorithm: themeMode === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm
      }}
    >
      <ExampleInner toggleTheme={handleToggleTheme} />
    </ConfigProvider>
  )
})