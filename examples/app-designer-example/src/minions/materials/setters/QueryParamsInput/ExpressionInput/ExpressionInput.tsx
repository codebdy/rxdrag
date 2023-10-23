import { Input, Space, TreeSelect, TreeSelectProps } from "antd"
import { memo, useState } from "react"
import { OperatorSelect } from "./OperatorSelect"
import type { ExpressionInputProps } from "./ExpressionInputProps"
import { DefaultOptionType } from "antd/es/select"

export const ExpressionInput = memo((
  props: ExpressionInputProps
) => {
  const [value, setValue] = useState<string>();
  const [treeData, setTreeData] = useState<Omit<DefaultOptionType, 'label'>[]>([
    { id: 1, pId: 0, value: '1', title: 'Expand to load' },
    { id: 2, pId: 0, value: '2', title: 'Expand to load' },
    { id: 3, pId: 0, value: '3', title: 'Tree Node', isLeaf: true },
  ]);

  const genTreeNode = (parentId: number, isLeaf = false) => {
    const random = Math.random().toString(36).substring(2, 6);
    return {
      id: random,
      pId: parentId,
      value: random,
      title: isLeaf ? 'Tree Node' : 'Expand to load',
      isLeaf,
    };
  };

  const onLoadData: TreeSelectProps['loadData'] = ({ id }) =>
    new Promise((resolve) => {
      setTimeout(() => {
        setTreeData(
          treeData.concat([genTreeNode(id, false), genTreeNode(id, true), genTreeNode(id, true)]),
        );
        resolve(undefined);
      }, 300);
    });

  const onChange = (newValue: string) => {
    console.log(newValue);
    setValue(newValue);
  };

  return (
    <Space>
      <div>
        <TreeSelect
          treeDataSimpleMode
          style={{ width: "100%" }}
          value={value}
          dropdownStyle={{ overflow: 'auto', width: 500 }}
          placeholder="Please select"
          onChange={onChange}
          loadData={onLoadData}
          treeData={treeData}
        />
      </div>
      <OperatorSelect />
      <Input />
    </Space>
  )
})