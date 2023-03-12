import { ConfigProvider, theme } from "antd"
import { useThemeMode } from "core-react/hooks/useThemeMode"
import { memo } from "react"

export const ConfigRoot = memo((
  props:{
    children?:React.ReactNode
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