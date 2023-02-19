
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
import { createUuid } from "react-shells/ant5/SettingsForm/components/ReactionsInput/ReactionsEditor/utils"
import { ArrayField } from "runner/fieldy/components/ArrayField/ArrayField"
import { Table as AntdTable } from "antd"
import { IDataSource } from "../IDataSource"
import { useComponentSchema } from "runner/ComponentRender/hooks/useComponentSchema"
import { ComponentView } from "runner/ComponentRender/ComponentView"
import { ObjectField } from "runner/fieldy/components/ObjectField"
import { IFieldMeta } from "runner/fieldy"
import { IBindParams } from "runner/ComponentRender/interfaces"
import { useFieldState } from "runner/fieldy/hooks/useFieldState"

interface RowProps {
  index: number,
}

interface TableCellProps {
  editable: boolean;
  children: React.ReactNode;
  record: any;
  fieldMeta?: IFieldMeta<IBindParams>;
}

const TableCell: React.FC<TableCellProps> = ({
  fieldMeta,
  record,
  children,
  ...restProps
}) => {
  const parentField = useFieldState()

  return <td {...restProps}>
    {
      fieldMeta?.name && fieldMeta.params?.withBind
        ? parentField?.value?.[fieldMeta.name]?.toString()
        : children
    }
  </td>;
};

export type TableProps = {
  header?: React.ReactElement,
  footer?: React.ReactElement,
  summary?: React.ReactElement,
  dataSource?: IDataSource,
  pagination?: false | 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight',
  pageSize?: number,
  rowKey?: string,
}

// 本控件强依赖ComponentRender
export const Table = memo((
  props: TableProps
) => {
  const { header, footer, dataSource, pagination, summary, pageSize, rowKey = "id", ...other } = props
  const [id] = useState(createUuid())
  const nodeSchema = useComponentSchema()
  const columns = useMemo(() => {
    return nodeSchema?.children?.map(child => {
      return {
        ...child?.props,
        render: () => {
          return <ComponentView node={child} />
        },
        onCell: (record: any, index?: number) => ({
          record,
          fieldMeta: child["x-field"],
        }),
      }
    })
  }, [nodeSchema?.children])

  const handleChange = useCallback(() => {

  }, [])
  const TableRow: React.FC<RowProps> = useMemo(() => (props) => {
    const { index, ...other } = props
    const row = dataSource?.nodes?.[index]

    return (
      index !== undefined
        ? <ObjectField name={index?.toString() || ""} value={row}>
          <tr {...other} />
        </ObjectField>
        : <tr {...other} />
    );
  }, [dataSource?.nodes]);

  return (
    <ArrayField name={id} value={dataSource?.nodes}>
      <AntdTable
        columns={columns as any}
        dataSource={dataSource?.nodes}
        rowKey={rowKey}
        onRow={(_, index) => ({ index } as any)}
        components={{
          body: {
            row: TableRow,
            cell: TableCell,
          },
        }}

        pagination={
          pagination === false
            ? pagination
            : {
              position: pagination && [pagination],
              pageSize: pageSize,
            }
        }
        summary={(pageData) => {
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