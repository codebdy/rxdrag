import React, { memo } from "react"
import styled from "styled-components"

const Icon = styled.div`
  width: 100%;
  font-size: 28px;
  height: 54px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border-radius: 8px;
  background-color: ${props => props.theme.token?.colorBorderSecondary};
`

const Shell = styled((props) => <div {...props} />)`
  width: calc(50% - 8px);
  margin: 4px;
  display: flex;
  flex-flow: column;
  align-items: center;
  user-select: none;
  cursor: move;
  color: ${props => props.theme.token?.colorTextSecondary};
  &:hover {
    color: ${props => props.theme.token?.colorText};
  };
  &:hover ${Icon}{
    background-color: ${props => props.theme.token?.colorBorder};
  };
  box-sizing: border-box;
  margin-top: 8px;
  margin-bottom: 8px;
`


const Title = styled.div`
  margin-top: 8px;
  font-size: 12px;
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