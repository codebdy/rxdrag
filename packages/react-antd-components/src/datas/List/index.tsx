import React, { memo, useState } from "react"
import { List as AntdList, ListProps } from "antd"
import { createId } from "@rxdrag/shared"
import { ArrayField, ObjectField } from "@rxdrag/react-fieldy"
import { IPaginationConfig } from "../interfaces"

export type ListAddonProps = {
  renderItem?: React.ReactElement,
  dataSource?: [],
  pagination?: IPaginationConfig,
}

export const List = memo((props: ListProps<unknown> & ListAddonProps) => {
  const { renderItem, dataSource, pagination, ...other } = props
  const [id] = useState(createId())

  return (
    <ArrayField name={id} value={dataSource}>
      <AntdList
        dataSource={dataSource}
        pagination={
          pagination === false
            ? pagination
            : {
              pageSize: pagination?.pageSize,
              total: pagination?.total,
              onChange: pagination?.onPageChange
            }
        }
        renderItem={(_, index) => (
          <ObjectField name={index.toString()}>
            {renderItem}
          </ObjectField>
        )}
        {...other}
      />
    </ArrayField>
  )
})