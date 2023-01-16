import { Node } from '@antv/x6'
import '@antv/x6-react-shape'

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

export const AlgoNode = (props:{node?:Node}) => {
  const { node } = props
  const data = node?.getData() as NodeStatus
  const { label, status = 'default' } = data

  return (
    <div className={`node ${status}`}>
      <img src={image.logo} />
      <span className="label">{label}</span>
    </div>
  )
}