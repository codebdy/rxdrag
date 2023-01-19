import { Node } from '@antv/x6'
import '@antv/x6-react-shape'
import { IReactionMaterial } from 'runner/reaction/interfaces/marerial'
import { IReactionNodeMeta } from 'runner/reaction/interfaces/metas'
import styled from 'styled-components'

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
    width: 104px;
    margin-left: 8px;
    font-size: 13px;
`

export interface NodeViewParams {
  nodeMeta: IReactionNodeMeta;
  backgroundColor: string;
  material: IReactionMaterial;
  color: string;
}


export const ReactionNode = (props: { node?: Node }) => {
  const { node } = props
  const data = node?.getData() as NodeViewParams
  const { label } = data.nodeMeta

  return (
    <NodeView className='node' style={{ backgroundColor: data.backgroundColor, color: data.color }}>
      <Icon style={{ color: data?.material.color }}>
        {data?.material?.icon}
      </Icon>
      <Label>{label}</Label>
    </NodeView>
  )
}