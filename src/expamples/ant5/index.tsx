import { memo, useCallback, useState } from "react"
import { Antd5Editor } from "react-shells/ant5"
import { componentsIcon, historyIcon, outlineIcon } from "react-shells/ant5/icons"
import { HistoryWidget } from "react-shells/ant5/widgets/HistoryWidget"
import { LeftNavWidget } from "react-shells/ant5/widgets/LeftNavWidget"
import { OutlineWidget } from "react-shells/ant5/widgets/OutlineWidget"
import { toolsLocales } from "./locales"
import { ResourceWidget } from "./ResourceWidget"

export enum LeftNavType {
  compoents = "components",
  outline = "outline",
  history = "history",
}

export const Antd5Example = memo(() => {
  const [activedKey, setActivedKey] = useState<LeftNavType>(LeftNavType.compoents)
  const handleActive = useCallback((key: string) => {
    setActivedKey(key as LeftNavType)
  }, [])
  return (
    <Antd5Editor
      navPanel={
        <>
          {
            //ResourceWidget 内部会注册组件，要防止多次渲染
            <ResourceWidget display={activedKey === LeftNavType.compoents} />
          }
          <HistoryWidget display={activedKey === LeftNavType.history} />
          <OutlineWidget display={activedKey === LeftNavType.outline} />
        </>
      }
      locales={toolsLocales}
      leftNav={
        <LeftNavWidget
          //showTitle
          defaultActivedKey="components"
          items={[
            {
              key: LeftNavType.compoents,
              title: "components",
              icon: componentsIcon
            },
            {
              key: LeftNavType.outline,
              title: "outline",
              icon: outlineIcon
            },
            {
              key: LeftNavType.history,
              title: "history",
              icon: historyIcon
            },
          ]}
          onActive={handleActive}
        />
      }
    />
  )
})