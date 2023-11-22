import { useToken } from "antd/es/theme/internal"
import { CSSProperties, forwardRef, memo, useMemo } from "react"
import styled, { ThemeProvider } from "styled-components"

const HeroInner = styled.div`
  padding: 24px;
  border-radius: 8px;
  color: ${props => props.theme.token?.colorText};
`
export type HeroContentProps = {
  style?: CSSProperties,
  children?: React.ReactNode,
}

export const HeroConent = memo(forwardRef<HTMLDivElement, HeroContentProps>((props, ref) => {
  const [, token] = useToken()
  const theme = useMemo(() => {
    return {
      token
    }
  }, [token])

  return (
    <ThemeProvider theme={theme}>
      <HeroInner
        ref={ref}
        {...props}
      />
    </ThemeProvider>
  )
}))