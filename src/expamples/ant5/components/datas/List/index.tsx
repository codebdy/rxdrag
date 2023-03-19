import React, { forwardRef, memo, useState } from "react"
import { List as AntdList, ListProps } from "antd"
import { ArrayField } from "runner/fieldy/components/ArrayField/ArrayField"
import { createUuid } from "react-shells/ant5/SettingsForm/components/ReactionsInput/ReactionsEditor/utils"
import { ObjectField } from "runner/fieldy/components/ObjectField"
import { IDataSource } from "../IDataSource"

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