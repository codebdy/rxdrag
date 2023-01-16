import { Node } from '@antv/x6'
import '@antv/x6-react-shape'
import styled from 'styled-components'

const NodeView = styled.div`
  .node {
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
  }
  .node img {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    margin-left: 8px;
  }
  .node .label {
    display: inline-block;
    flex-shrink: 0;
    width: 104px;
    margin-left: 8px;
    color: #fff;
    font-size: 12px;
  }
  .node .status {
    flex-shrink: 0;
  }
  .node.success {
    border-left: 4px solid #52c41a;
  }
  .node.failed {
    border-left: 4px solid #ff4d4f;
  }
  .node.running .status img {
    animation: spin 1s linear infinite;
  }
  .x6-node-selected .node {
    border-color: #1890ff;
    border-radius: 2px;
    box-shadow: 0 0 0 4px #d4e8fe;
  }
  .x6-node-selected .node.success {
    border-color: #52c41a;
    border-radius: 2px;
    box-shadow: 0 0 0 4px rgba(22,104,220, 0.5);
  }
  .x6-node-selected .node.failed {
    border-color: #ff4d4f;
    border-radius: 2px;
    box-shadow: 0 0 0 4px #fedcdc;
  }
  .x6-edge:hover path:nth-child(2){
    stroke: #1890ff;
    stroke-width: 1px;
  }

  .x6-edge-selected path:nth-child(2){
    stroke: #1890ff;
    stroke-width: 1.5px !important;
  }

  @keyframes running-line {
    to {
      stroke-dashoffset: -1000;
    }
  }
  @keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
  }
`

export interface NodeStatus {
  id: string
  status: 'default' | 'success' | 'failed' | 'running'
  label?: string
}

const image = {
  logo: 'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*evDjT5vjkX0AAAAAAAAAAAAAARQnAQ',
  success:
    'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*6l60T6h8TTQAAAAAAAAAAAAAARQnAQ',
  failed:
    'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*SEISQ6My-HoAAAAAAAAAAAAAARQnAQ',
  running:
    'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*t8fURKfgSOgAAAAAAAAAAAAAARQnAQ',
}

export const AlgoNode = (props: { node?: Node }) => {
  const { node } = props
  const data = node?.getData() as NodeStatus
  const { label, status = 'default' } = data

  return (
    <NodeView className={`node ${status}`}>
      <img src={image.logo} />
      <span className="label">{label}</span>
    </NodeView>
  )
}