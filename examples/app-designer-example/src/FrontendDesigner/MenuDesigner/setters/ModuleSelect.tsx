import { ID } from "@rxdrag/shared";
import { TreeSelect } from "antd";
import { memo, useCallback, useMemo } from "react"
import { useAppFrontend } from "../../../hooks/useAppFrontend";

export const ModuleSelect = memo((
  props: {
    value?: ID,
    onChange?: (value: ID) => void,
  }
) => {
  const { value, onChange } = props;
  const appFront = useAppFrontend()

  const treeData = useMemo(() => {
    return appFront?.moduleCategories?.map(category => {
      return {
        value: category.id,
        title: category.title,
        selectable: false,
        children: category.modules?.map(module => {
          return {
            value: module.id,
            title: module.title,
            isLeaf: true,
          }
        })
      }
    }) || []
  }, [appFront?.moduleCategories])

  const hancleChange = useCallback((newValue: string) => {
    onChange?.(newValue);
  }, [onChange]);

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