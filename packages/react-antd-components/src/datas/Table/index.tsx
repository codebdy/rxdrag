/* eslint-disable @typescript-eslint/no-explicit-any */

// expandedRowRender 作为Slot，可以实现嵌套表格
// row render ，设置ObjectField
// cell render, 行内编辑的话需要这个（外置编辑组件+也逻辑编排的话，也可能用不上）
// rowSelection 复杂的属性配置
// rowExpandable 可作为Row的属性
// Table.EXPAND_COLUMN, 展开列
// Table.SELECTION_COLUMN， 选择列
// colSpan
// rowSpan
// 当数据中有 children 字段时会自动展示为树形表格
// columns dataSource pagination
// 固定表头， 固定列， scroll， Column.fixed
// column.ellipsis 单元格自动省略，column.ellipsis.showTitle 关闭单元格内容自动省略后默认的 title 提示, 使用 Tooltip 替代
// summary 作为slot

//拖拽排序，拖拽手柄，自增表格实现

// designer自带属性编辑组件

import { memo, useCallback, useMemo, useState } from "react"
import { Table as AntdTable, TablePaginationConfig } from "antd"
import { createId } from "@rxdrag/shared";
import { ComponentView, LogicflowRuntime, useArraySchema, useComponentSchema } from "@rxdrag/react-runner";
import { ArrayField, ObjectField, useFieldValue } from "@rxdrag/react-fieldy";
import { IFieldMeta } from "@rxdrag/fieldy";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import { IPaginationConfig } from "../interfaces";

interface RowProps {
  index: number,
}

interface TableCellProps {
  editable: boolean;
  children: React.ReactNode;
  record: unknown;
  fieldMeta?: IFieldMeta;
}

const TableCell: React.FC<TableCellProps> = ({
  fieldMeta,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  record,
  children,
  ...restProps
}) => {
  const parentValue = useFieldValue()

  return <td {...restProps}>
    {
      //@@ 2023-07-25删掉代码：fieldMeta?.name && fieldMeta.params?.withBind
      fieldMeta?.name && fieldMeta.type !== "array" && fieldMeta.type !== "object"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ? (parentValue as any)?.[fieldMeta.name]?.toString()
        : children
    }
  </td>;
};

export type TableProps = {
  header?: React.ReactElement,
  footer?: React.ReactElement,
  summary?: React.ReactElement,
  dataSource?: [],
  pagination?: IPaginationConfig,
  paginationPosition?: false | 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight',
  filters?: Record<string, FilterValue | null>,//类型要改，附加事件
  sorter?: SorterResult<never>[],//类型要改，附加事件
  rowKey?: string,
}

// 本控件强依赖ComponentRender
// 目前机制，label无法支持表达式
export const Table = memo((
  props: TableProps
) => {
  const { header,
    footer,
    dataSource,
    pagination,
    paginationPosition,
    summary,
    rowKey = "id",
    ...other
  } = props
  const [id] = useState(createId())
  const nodeSchema = useComponentSchema()
  const { schema, childrenSchema } = useArraySchema()

  const columns = useMemo(() => {
    return nodeSchema?.children?.map(child => {
      const { title, ...rest } = child?.props || {}
      const fiedMeta = child["x-data"]

      return {
        title: fiedMeta?.label || title,
        ...rest,
        render: () => {
          return <ComponentView node={child} />
        },
        onCell: (record: unknown) => ({
          record,
          fieldMeta: child["x-data"],
        }),
      }
    })
  }, [nodeSchema?.children])

  const TableRow: React.FC<RowProps> = useMemo(() => (props) => {
    const { index, ...other } = props
    const row = dataSource?.[index]

    return (
      index !== undefined && row
        ? <LogicflowRuntime
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          key={(row as any)?.[rowKey] || index}
          ownerId={schema?.["x-controller"]?.id}
          schema={childrenSchema}
          scropeIndex={index}
          scropeValue={row}
        ><ObjectField name={index?.toString() || ""} value={row}>
            <tr {...other} />
          </ObjectField>
        </LogicflowRuntime>
        : <tr {...other} />

    );
  }, [childrenSchema, dataSource, rowKey, schema]);

  const handleChange = useCallback((paginationConfig: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: SorterResult<never> | SorterResult<never>[]) => {
    pagination?.onPageChange?.(paginationConfig.current || 0, paginationConfig.pageSize)
  }, [pagination])

  return (
    <ArrayField name={id} value={dataSource}>
      <AntdTable
        columns={columns as any}
        dataSource={dataSource}
        rowKey={rowKey}
        title={header && (() => header)}
        footer={footer && (() => footer)}
        onRow={(_, index) => ({ index } as any)}
        components={{
          body: {
            row: TableRow,
            cell: TableCell,
          },
        }}

        pagination={
          paginationPosition === false
            ? paginationPosition
            : {
              ...pagination,
              position: paginationPosition && [paginationPosition],
            }
        }
        summary={() => {
          return (
            summary
          );
        }}
        onChange={handleChange}
        {...other}
      />
    </ArrayField>
  )
})