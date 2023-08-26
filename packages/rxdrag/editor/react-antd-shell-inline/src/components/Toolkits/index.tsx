import { memo } from "react"
import { ToolketsScope } from "./ToolketsScope"
import { ToolkitsInner, ToolkitsInnerProps } from "./ToolkitsInner"
import { ConfigProvider, theme } from "antd";
import "./style.css"

export const Toolkits = memo((props: ToolkitsInnerProps & {
  name?: string,
}) => {
  const { toolbox, toolbar, name, themeMode = "dark" } = props;

  
  return (
    <ConfigProvider
      theme={{ algorithm: themeMode === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm }}
    >
      <ToolketsScope name={name}>
        <ToolkitsInner toolbox={toolbox} toolbar={toolbar} themeMode={themeMode} />
      </ToolketsScope>
    </ConfigProvider>
  )
})