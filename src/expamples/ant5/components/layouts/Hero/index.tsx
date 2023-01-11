import { ConfigProvider, theme } from "antd"
import { ConfigContext } from "antd/es/config-provider";
import { forwardRef, memo, CSSProperties, useContext, useMemo } from "react"
import styled from "styled-components";

export type HeroProps = {
  themeMode?: 'dark' | 'light' | 'inherit'
  style?: CSSProperties,
  children?: React.ReactNode,
  closeable?: boolean,
}

const HeroInner = styled.div`
  padding: 8px 24px 32px 24px;
  border-radius: 8px;
`

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
      <HeroInner
        ref={ref}
        {...other}
      >
        {children}
      </HeroInner>
    </ConfigProvider>
  )
}))