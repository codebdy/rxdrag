import { Cell } from "@antv/x6";

import { useCallback } from "react";


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

export function useNodeRender() {

  const nodeRender = useCallback(
    (node: Cell) => {
      const data = node.getData() as NodeStatus;
      const { label, status = 'default' } = data
      return `
      <div class="node ${status}">
        <img src='${image.logo}' />
        <span class="label">${label}</span>
        <span class="status">
          <img src='${image.success}' />}
        </span>
      </div>    `;
    },
    []
  );

  return nodeRender;
}
