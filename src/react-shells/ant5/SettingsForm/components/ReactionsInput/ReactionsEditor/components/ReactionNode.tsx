import { Node } from '@antv/x6'
import '@antv/x6-react-shape'
import { IReactionNodeMeta } from 'runner/reaction/metas'
import styled from 'styled-components'

const NodeView = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #111;
  color: #fff;
  border: 1px solid #c2c8d5;
  border-left: 4px solid #5F95FF;
  border-radius: 4px;
  box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.06);
`

const Label = styled.span`
    display: inline-block;
    flex-shrink: 0;
    width: 104px;
    margin-left: 8px;
    color: #fff;
    font-size: 12px;
`

export interface NodeStatus {
  id: string
  status: 'default' | 'success' | 'failed' | 'running'
  label?: string
}


export const ReactionNode = (props: { node?: Node }) => {
  const { node } = props
  const data = node?.getData() as IReactionNodeMeta
  const { label } = data

  return (
    <NodeView className='node'>
      <Label>{label}</Label>
    </NodeView>
  )
}