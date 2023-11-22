import { ConfigProvider, Layout, theme } from "antd"
import { forwardRef, memo, CSSProperties } from "react"
import { Trigger } from "../Trigger"
import styled from "styled-components"

const { Header: AntdHeader, } = Layout

const StyledHeader = styled(AntdHeader)`
  padding: 0;
  padding-inline: 0 !important;
  padding-inline-end: 16px !important;
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.token?.colorBgBase};
  color:${props => props.theme.token?.colorText};
`

export type HeaderProps = {
  style?: CSSProperties
  hasTrigger?: boolean
  dark?: boolean,
  children?: React.ReactNode,
  sticky?: boolean,
  disableTrigger?: boolean
}

export const Header = memo(forwardRef<HTMLDivElement, HeaderProps>((
  props, ref) => {
  const { hasTrigger = true, disableTrigger, dark, children, ...other } = props;

  return (
    <ConfigProvider
      theme={{
        algorithm: dark ? theme.darkAlgorithm : theme.defaultAlgorithm
      }}
    >
      <StyledHeader
        ref={ref}
        {...other}
      >
        {hasTrigger && <Trigger disable={disableTrigger} />}
        {children}
      </StyledHeader>
    </ConfigProvider>
  )
}))