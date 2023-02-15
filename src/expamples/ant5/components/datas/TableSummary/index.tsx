import { Table, Typography } from "antd"
import { useGetElement } from "core-react/hooks/useGetElement";
import { useNode } from "core-react/hooks/useNode";
import { isFunction } from "lodash";
import { forwardRef, memo, useLayoutEffect } from "react"

const { Text } = Typography;

// Table.Summary不能接受rxid跟ref，需要根据tfoot tag name 跟 class 魔改到dom上
// 先获取父节点rx-id，然后查询子节点
export const TableSummary = memo(forwardRef<HTMLDivElement>((props, ref) => {
  const node = useNode()
  const getElement = useGetElement()
  useLayoutEffect(()=>{
    const parentElement = node?.parentId && getElement(node?.parentId)
    if(parentElement){
      const element = (parentElement as HTMLElement).getElementsByTagName("tfoot")?.[0]
      if(isFunction(ref)){
        ref(element)
      }
    }

  }, [getElement, node?.parentId, ref])
  
  return (
    <Table.Summary {...props}>
      <Table.Summary.Row>
        <>
          <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
          <Table.Summary.Cell index={1}>
            <Text type="danger">dd</Text>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={2}>
            <Text>xx</Text>
          </Table.Summary.Cell>
        </>
      </Table.Summary.Row>
      <Table.Summary.Row>
        <>
          <Table.Summary.Cell index={0}>Balance</Table.Summary.Cell>
        </>
        <Table.Summary.Cell index={1} colSpan={2}>
          <Text type="danger">yy</Text>
        </Table.Summary.Cell>
      </Table.Summary.Row>
    </Table.Summary>
  )
}))