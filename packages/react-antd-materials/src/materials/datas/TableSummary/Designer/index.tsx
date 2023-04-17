import { isFn } from "@rxdrag/shared";
import { Table } from "antd"
import { forwardRef, memo, useCallback } from "react"
import { PlaceHolder } from "./PlaceHolder";

// Table.Summary不能接受rxid跟ref，需要根据tfoot tag name 跟 class 魔改到dom上
// 先获取父节点rx-id，然后查询子节点
export const TableSummaryDesigner = memo(forwardRef<HTMLDivElement>((props: { children?: React.ReactNode }, ref) => {
  const { children, ...other } = props;

  const handleRefChange = useCallback((element: HTMLElement | null) => {
    if (isFn(ref)) {
      ref(element?.parentElement)
    }
  }, [ref])

  return (
    <Table.Summary {...other}>
      {
        children
          ? children
          : <PlaceHolder />
      }
      <tr ref={handleRefChange} style={{ display: "none" }} />
    </Table.Summary>
  )
}))