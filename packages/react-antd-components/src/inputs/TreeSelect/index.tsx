import { TreeSelect as AntdTreeSelect } from 'antd';
import { DataNode } from 'antd/es/tree';
import { CSSProperties, forwardRef, memo, useCallback, useMemo } from 'react';


interface IDataNode {
  id: string,
  name?: string,
  children?: IDataNode[],
}

type TreeSelectProps = {
  value?: IDataNode,
  onChange?: (value?: IDataNode) => void,
  style?: CSSProperties,
  dataSource?: IDataNode[]
}

export const TreeSelect = memo(forwardRef<HTMLDivElement, TreeSelectProps>((props, ref) => {
  const { value, onChange, style, dataSource, ...rest } = props;

  const getOneNode = useCallback((node: IDataNode): any => {
    return {
      title: node.name,
      value: node.id,
      children: node.children?.map(node => getOneNode(node))
    }
  }, [])

  const treeData: DataNode[] = useMemo(
    () => dataSource?.map(node => getOneNode(node)) || [],
    [dataSource, getOneNode]
  );


  const handleChange = useCallback((value: string) => {
    onChange?.({ id: value })
  }, [onChange])

  return (
    <AntdTreeSelect
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      showSearch
      style={{ width: '100%', ...style }}
      value={value?.id}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      allowClear
      treeDefaultExpandAll
      onChange={handleChange}
      treeData={treeData}
      {...rest}
    />
  );
}));