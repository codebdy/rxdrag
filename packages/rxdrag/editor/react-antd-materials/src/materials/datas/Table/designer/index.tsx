import { TableProps } from "@rxdrag/react-antd-components";
import { useNode, useTreeNodes, ComponentDesignerView } from "@rxdrag/react-core";
import { Table } from "antd";
import { forwardRef, memo, useMemo } from "react"

export const TableDesigner = memo(forwardRef<HTMLDivElement>((
  props: TableProps,
  ref
) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { header, footer, summary, dataSource, pagination, ...other } = props
  const node = useNode()
  const childNodes = useTreeNodes(node?.children || [])
  const columns = useMemo(() => {
    return childNodes?.map(child => ({
      ...child?.meta?.props,
      render: () => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
        return <ComponentDesignerView nodeId={child?.id!} />
      }
    }))
  }, [childNodes])

  return (
    <Table
      ref={ref}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      columns={columns as any}
      title={header && (() => header)}
      footer={footer && (() => footer)}
      dataSource={[{ key: "1" }]}
      pagination={pagination === false ? pagination : { position: pagination && [pagination] }}
      {...other}
      summary={() => {
        return (
          summary
        );
      }}
    />
  )
}))