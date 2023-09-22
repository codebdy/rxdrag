import React, { memo, useCallback, useState } from "react"
import { List as AntdList, ListProps } from "antd"
import { IDataSource } from "../IDataSource"
import { createUuid } from "@rxdrag/shared"
import { ArrayField, ObjectField } from "@rxdrag/react-fieldy"

export type ListAddonProps = {
  renderItem?: React.ReactElement,
  dataSource?: IDataSource,
  pageSize?: number,
  onPageChange?: (page: number, pageSize: number) => void
}

export const List = memo((props: ListProps<unknown> & ListAddonProps) => {
  const { renderItem, dataSource, pageSize, pagination, onPageChange, ...other } = props
  const [id] = useState(createUuid())

  const handlePageChange = useCallback((page: number, pageSize: number) => {
    onPageChange?.(page, pageSize)
  }, [onPageChange])

  return (
    <ArrayField name={id} value={dataSource?.nodes}>

      <AntdList
        dataSource={dataSource?.nodes}
        pagination={
          pagination === false
            ? pagination
            : {
              pageSize: pageSize,
              total: dataSource?.total,
              onChange: handlePageChange
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