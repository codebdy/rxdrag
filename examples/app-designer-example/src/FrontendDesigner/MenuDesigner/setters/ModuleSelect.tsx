import { ID } from "@rxdrag/shared";
import { TreeSelect } from "antd";
import { memo, useCallback, useState } from "react"

const treeData = [
  {
    title: 'Node1',
    value: '0-0',
    selectable: false,
    children: [
      {
        title: 'Child Node1',
        value: '0-0-1',
      },
      {
        title: 'Child Node2',
        value: '0-0-2',
      },
    ],
  },
  {
    title: 'Node2',
    value: '0-1',
  },
];

export const ModuleSelect = memo((
  props: {
    value?: ID,
    onChange?: (value: ID) => void,
  }
) => {
  const [value, setValue] = useState<string>();

  const hancleChange = useCallback((newValue: string) => {
    console.log(newValue);
    setValue(newValue);
  }, []);

  return (
    <TreeSelect
      value={value}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      treeData={treeData}
      treeDefaultExpandAll
      onChange={hancleChange}
    />
  )
})