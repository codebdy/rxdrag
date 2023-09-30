import { Node } from '@antv/x6'
import '@antv/x6-react-shape'
import { insertCss } from 'insert-css'
import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { INodeData } from '../interfaces/interfaces'
import { IThemeToken } from '../interfaces'

insertCss(`
.x6-node-selected .node{
  box-shadow: 0 0 0 4px rgba(0,144,255, 0.5);
}

.x6-node-selected .start-node, .x6-node-selected .end-node {
  outline: solid rgba(24,144,255, 0.5) 4px;
  border-radius: 50%;
}

.x6-node-selected .group-node {
  outline: solid rgba(24,144,255, 0.5) 4px;
  border-radius: 6px;
}

.x6-edge:hover path:nth-child(2){
  stroke: #1890ff;
  stroke-width: 1px;
}

.x6-edge-selected path:nth-child(2){
  stroke: #1890ff;
  stroke-width: 1.5px !important;
}

`)

const NodeView = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  height: 100%;
  outline: 1px solid #c2c8d5;
  border-radius: 4px;
  box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.06);
  padding: 0 16px;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
`

const ReactionName = styled.div`
    display: flex;
`

const ReactionOwner = styled.div`
  display: flex;
  font-size: 12px;
  margin-top: 0px;
  white-space:nowrap;
  overflow: hidden;
  font-style: italic;
`

const Icon = styled.div`
  display: flex;
  font-size: 20px;
  align-items: center;
`

const Label = styled.span`
  display: inline-block;
  flex-shrink: 0;
  margin-left: 8px;
  font-size: 13px;
`

export interface NodeViewParams extends INodeData {
  color?: string;
  iconColor?: string;
  icon?: React.ReactElement,
  token: IThemeToken,
  width: number,
  height: number,
  title?: string,
  subLabel?: string,
  inputCounts?: number,
  outputCounts?: number,
}

export const ReactionNode = (props: { node?: Node }) => {
  const { node } = props
  const data = node?.getData() as NodeViewParams
  const { token, title, subLabel } = data
  const { label } = data.meta

  const inputPortCount = data.meta.inPorts?.length || data.inputCounts
  const outputPortCount = data.meta.outPorts?.length || data.outputCounts
  return (
    <NodeView
      className='node'
      style={{
        backgroundColor: token.colorBgContainer,
        color: token.colorText,
        outlineColor: token.colorTextSecondary,
        borderTopLeftRadius: !inputPortCount ? data.height / 2 : undefined,
        borderBottomLeftRadius: !inputPortCount ? data.height / 2 : undefined,
        borderTopRightRadius: !outputPortCount ? data.height / 2 : undefined,
        borderBottomRightRadius: !outputPortCount ? data.height / 2 : undefined,
      }}
    >
      <ReactionName>
        <Icon style={{ color: data?.iconColor }}>
          {data?.icon as ReactNode | undefined}
        </Icon>
        <Label>{title || label}</Label>
      </ReactionName>
      {
        subLabel &&
        <ReactionOwner style={{ color: token.colorTextSecondary }}>
          {subLabel}
        </ReactionOwner>
      }
    </NodeView>
  )
}