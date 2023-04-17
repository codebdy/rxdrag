import React, { forwardRef, memo, useState } from "react"
import { List as AntdList, ListProps } from "antd"
import { IDataSource } from "../IDataSource"
import { createUuid } from "@rxdrag/shared"
import { ArrayField, ObjectField } from "@rxdrag/react-fieldy"

export type ListAddonProps = {
  renderItem?: React.ReactElement,
  dataSource?: IDataSource,
}

export const List = memo(forwardRef<HTMLDivElement>((props: ListProps<any> & ListAddonProps, ref) => {
  const { renderItem, dataSource, ...other } = props
  const [id] = useState(createUuid())

  return (
    <ArrayField name={id} value={dataSource?.nodes}>
      <AntdList
        dataSource={dataSource?.nodes}
        renderItem={(item, index) => (
          <ObjectField name={index.toString()} value={item}>
            {renderItem}
          </ObjectField>
        )}
        {...other}
      />
    </ArrayField>
  )
}))