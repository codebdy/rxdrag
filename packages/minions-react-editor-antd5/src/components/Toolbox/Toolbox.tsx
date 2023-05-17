import { Collapse as AntdCollapse, Row } from "antd";
import { memo, ReactNode } from "react";
import styled from "styled-components";
import { useTrans } from "../../hooks/useTrans";

const StyledToolbox = styled.div`
  user-select: none;
  width: 180px;
  border-right: ${props => props.theme.token?.colorBorder} solid 1px;
  height: 100%;
  display: flex;
  flex-flow: column;
`


export const Toolbox = memo((props: {
  children?: ReactNode
}) => {
  const { children } = props
  const t = useTrans();

  return (
    <StyledToolbox>
      {children}
    </StyledToolbox >
  )
})