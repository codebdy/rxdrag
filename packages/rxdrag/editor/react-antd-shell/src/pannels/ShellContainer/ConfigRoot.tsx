import { useThemeMode } from "@rxdrag/react-core"
import { ConfigProvider, theme } from "antd"
import { memo } from "react"

export const ConfigRoot: React.FC<{ children?: React.ReactNode }> = memo((
  props: {
    children?: React.ReactNode
  }
) => {
  const themeMode = useThemeMode()
  return (
    <ConfigProvider
      theme={{
        algorithm: themeMode === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm
      }}
    >
      {
        props.children
      }
    </ConfigProvider>
  )
})