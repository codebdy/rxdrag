import { ConfigProvider, theme } from "antd"
import { ConfigContext } from "antd/es/config-provider";
import { forwardRef, memo, CSSProperties, useContext, useMemo } from "react"
import { HeroConent } from "./HeroContent";

export type HeroProps = {
  themeMode?: 'dark' | 'light' | 'inherit'
  style?: CSSProperties,
  children?: React.ReactNode,
}

export const Hero = memo(forwardRef<HTMLDivElement>((props: HeroProps, ref) => {
  const { themeMode = 'inherit', children, ...other } = props
  const config = useContext(ConfigContext)

  const algorithm = useMemo(() => {
    if (themeMode === 'inherit') {
      return config.theme?.algorithm
    }
    if (themeMode === 'dark') {
      return theme.darkAlgorithm
    }

    return theme.defaultAlgorithm
  }, [config.theme, themeMode])

  return (
    <ConfigProvider
      theme={{
        algorithm: algorithm
      }}
    >
      <HeroConent
        ref={ref}
        {...other}
      >
        {children}
      </HeroConent>
    </ConfigProvider>
  )
}))