import { IFieldMeta } from "@rxdrag/fieldy";
import { TableProps } from "@rxdrag/react-antd-components";
import { useNode, useTreeNodes, ComponentDesignerView } from "@rxdrag/react-core";
import { Table } from "antd";
import { Ref, forwardRef, memo, useMemo } from "react"

export const TableDesigner = memo(forwardRef<any | undefined>((
  props: TableProps,
  ref
) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { header, footer, summary, dataSource, paginationPosition, ...other } = props
  const node = useNode()
  const childNodes = useTreeNodes(node?.children || [])
  const columns = useMemo(() => {

    return childNodes?.map(child => {
      const { title, ...rest } = child?.meta?.props || {}
      const fiedMeta = child?.meta?.["x-data"] as IFieldMeta | undefined

      return {
        title: fiedMeta?.label || title,
        ...rest,
        render: () => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
          return <ComponentDesignerView nodeId={child?.id!} />
        },
        onCell: () => {
          return {
            //将rx-id传入表头，tr/th组合成一列
            "rx-id": child?.id,
          }
        },
        onHeaderCell: () => {
          return {
            //将rx-id传入表头，tr/th组合成一列
            "rx-id": child?.id,
          }
        }
      }
    })
  }, [childNodes])

  return (
    <Table
      id="ttt"
      ref={ref}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      columns={columns as any}
      title={header && (() => header)}
      footer={footer && (() => footer)}
      dataSource={[{ key: "1" }]}
      pagination={paginationPosition === false ? paginationPosition : { position: paginationPosition && [paginationPosition] }}
      {...other}
      summary={() => {
        return (
          summary
        );
      }}
    />
  )
}))