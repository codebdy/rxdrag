import React, { memo } from "react"
import styled from "styled-components"

const Icon = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  margin-right: 0px;
  font-size: 18px;
`

const Shell = styled((props) => <div {...props} />)`
  width: calc(50% - 8px);
  margin: 4px;
  display: flex;
  align-items: center;
  user-select: none;
  cursor: move;
  border-radius: 4px;
  background-color: ${props => props.theme.token?.colorBorderSecondary};
  color: ${props => props.theme.token?.colorTextSecondary};
  &:hover {
    color: ${props => props.theme.token?.colorText};
  };
  &:hover {
    background-color: ${props => props.theme.token?.colorBorder};
  };
  box-sizing: border-box;
  margin-bottom: 8px;
`
const Title = styled.div`

`

export const ToolItem = memo((
  props: {
    title?: string,
    icon?: React.ReactNode,
    color?: string,
    onMouseDown?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  }
) => {
  const { title, icon, color, ...other } = props
  return (
    <Shell {...other}>
      <Icon style={{ color }}>{icon}</Icon>
      <Title>{title}</Title>
    </Shell>
  )
})