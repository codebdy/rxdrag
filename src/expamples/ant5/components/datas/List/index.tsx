import React, { forwardRef, memo, useState } from "react"
import { List as AntdList, ListProps } from "antd"
import { ArrayField } from "runner/fieldy/components/ArrayField/ArrayField"
import { createUuid } from "react-shells/ant5/SettingsForm/components/ReactionsInput/ReactionsEditor/utils"
import { ObjectField } from "runner/fieldy/components/ObjectField/ObjectField"

export type ListAddonProps = {
  renderItem?: React.ReactElement,
}

export const List = memo(forwardRef<HTMLDivElement>((props: ListProps<any> & ListAddonProps, ref) => {
  const { renderItem, dataSource, ...other } = props
  const [id] = useState(createUuid())

  return (
    <ArrayField name={id} value={dataSource}>
      <AntdList
        dataSource={dataSource}
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