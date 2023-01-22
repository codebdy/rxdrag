import { Node } from '@antv/x6'
import '@antv/x6-react-shape'
import { GlobalToken } from 'antd/es/theme/interface'
import { IReactionMaterial } from 'runner/reaction/interfaces/material'
import { IReactionNodeMeta } from 'runner/reaction/interfaces/metas'
import { insertCss } from 'insert-css'
import styled from 'styled-components'
import { INodeData } from '../interfaces'

insertCss(`
.x6-node-selected .node{
  box-shadow: 0 0 0 4px rgba(0,144,255, 0.5);
}

.x6-node-selected .start-node, .x6-node-selected .end-node {
  outline: solid rgba(24,144,255, 0.5) 4px;
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
  align-items: center;
  width: 100%;
  height: 100%;
  outline: 1px solid #c2c8d5;
  border-radius: 4px;
  box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.06);
  padding: 0 16px;
  box-sizing: border-box;
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
  material: IReactionMaterial;
  token: GlobalToken
}


export const ReactionNode = (props: { node?: Node }) => {
  const { node } = props
  const data = node?.getData() as NodeViewParams
  const { token } = data
  const { label } = data.meta

  return (
    <NodeView
      className='node'
      style={{
        backgroundColor: token.colorBgContainer,
        color: token.colorText,
        outlineColor: token.colorTextSecondary,
      }}
    >
      <Icon style={{ color: data?.material.color }}>
        {data?.material?.icon}
      </Icon>
      <Label>{label}</Label>
    </NodeView>
  )
}