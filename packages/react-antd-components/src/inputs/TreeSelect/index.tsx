import { TreeSelect as AntdTreeSelect } from 'antd';
import { CSSProperties, forwardRef, memo } from 'react';

const treeData = [
  {
    value: 'parent 1',
    title: 'parent 1',
    children: [
      {
        value: 'parent 1-0',
        title: 'parent 1-0',
        children: [
          {
            value: 'leaf1',
            title: 'leaf1',
          },
          {
            value: 'leaf2',
            title: 'leaf2',
          },
        ],
      },
      {
        value: 'parent 1-1',
        title: 'parent 1-1',
        children: [
          {
            value: 'leaf3',
            title: <b style={{ color: '#08c' }}>leaf3</b>,
          },
        ],
      },
    ],
  },
];

interface IDataNode {
  id: string,
}

type TreeSelectProps = {
  value?: IDataNode,
  onChange?: (value?: IDataNode) => void,
  style?: CSSProperties,
}

export const TreeSelect = memo(forwardRef<HTMLDivElement, TreeSelectProps>((props, ref) => {
  const { value, onChange, style, ...rest } = props;

  return (
    <AntdTreeSelect
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      showSearch
      style={{ width: '100%', ...style }}
      value={value}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      allowClear
      treeDefaultExpandAll
      onChange={onChange}
      treeData={treeData}
      {...rest}
    />
  );
}));