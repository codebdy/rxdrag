
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

import { memo, useCallback, useState } from "react"
import { createUuid } from "react-shells/ant5/SettingsForm/components/ReactionsInput/ReactionsEditor/utils"
import { ArrayField } from "runner/fieldy/components/ArrayField/ArrayField"
import { Table as AntdTable } from "antd"
import { IDataSource } from "../IDataSource"

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

  const handleChange = useCallback(() => {

  }, [])

  return (
    <ArrayField name={id} value={dataSource?.nodes}>
      <AntdTable
        dataSource={dataSource?.nodes}
        rowKey = {rowKey}
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