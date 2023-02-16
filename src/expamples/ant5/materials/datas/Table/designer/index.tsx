import { Table } from "antd";
import { ComponentDesignerView } from "core-react/ComponentTreeWidget/ComponentDesignerView";
import { useGetNode } from "core-react/hooks/useGetNode";
import { useNode } from "core-react/hooks/useNode";
import { TableProps } from "expamples/ant5/components/datas/Table"
import { forwardRef, memo, useMemo } from "react"

export const TableDesigner = memo(forwardRef<HTMLDivElement>((
  props: TableProps,
  ref
) => {
  const { header, footer, summary, ...other } = props
  const node = useNode()
  const getNode = useGetNode()
  const colums = useMemo(() => {
    return node?.children?.map(childId => getNode(childId)).filter(child => child).map(child => ({
      title: 'Cash Assets',
      className: 'column-money',
      dataIndex: 'money',
      //align: 'right',
      render: () => {
        return <ComponentDesignerView nodeId={child?.id!} />
      }
    }))
  }, [getNode, node?.children])

  return (
    <Table
      ref={ref}
      columns={colums as any}
      bordered
      title={header && (() => header)}
      footer={footer && (() => footer)}
      {...other}
      summary={(pageData) => {
        return (
          summary
        );
      }}
    />
  )
}))