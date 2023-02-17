import { Table } from "antd"
import { useGetElement } from "core-react/hooks/useGetElement";
import { useNode } from "core-react/hooks/useNode";
import { isFunction } from "lodash";
import { forwardRef, memo, useLayoutEffect } from "react"
import { PlaceHolder } from "./PlaceHolder";

// Table.Summary不能接受rxid跟ref，需要根据tfoot tag name 跟 class 魔改到dom上
// 先获取父节点rx-id，然后查询子节点
export const TableSummaryDesigner = memo(forwardRef<HTMLDivElement>((props: { children?: React.ReactNode }, ref) => {
  const { children, ...other } = props;
  const node = useNode()
  const getElement = useGetElement()
  useLayoutEffect(() => {
    const parentElement = node?.parentId && getElement(node?.parentId)
    if (parentElement) {
      const element = (parentElement as HTMLElement).getElementsByTagName("tfoot")?.[0]
      if (isFunction(ref)) {
        ref(element)
      }
    }

  }, [getElement, node?.parentId, ref])

  return (
    <Table.Summary {...other}>
      {
      children
      ? children
      : <PlaceHolder />
      }
    </Table.Summary>
  )
}))