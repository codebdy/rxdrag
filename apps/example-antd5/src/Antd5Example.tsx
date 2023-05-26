import { FileOutlined, GithubFilled } from "@ant-design/icons"
import { Button, Space } from "antd"
import { memo, useCallback, useMemo, useState } from "react"
import {
  RxEditorAntd,
  HistoryWidget,
  LangButtons,
  LeftNavWidget,
  Logo,
  OutlineWidget,
  ThemeButton,
  componentsIcon,
  historyIcon,
  outlineIcon,
} from "@rxdrag/react-antd-shell"
import { toolsLocales } from "./locales"
import { ResourceWidget } from "./ResourceWidget"
import { SaveButton } from "./widgets/SaveButton"
import { PagesWidget } from "./PagesWidget"
import { pages } from "./data"

export enum LeftNavType {
  pages = "pages",
  compoents = "components",
  outline = "outline",
  history = "history",
}

export const Antd5Example = memo(() => {
  const [pageId, setPageId] = useState("dashboard")
  const [activedKey, setActivedKey] = useState<LeftNavType>(LeftNavType.compoents)
  const handleActive = useCallback((key: string) => {
    setActivedKey(key as LeftNavType)
  }, [])

  const schemas = useMemo(() => {
    return (pages as any)[pageId]
  }, [pageId])

  const handleSelect = useCallback((id: string) => {
    setPageId(id)
  }, [])

  return (
    <RxEditorAntd
      schemas={schemas}
      canvasUrl="/canvas-render"
      previewUrl="/preview-render"
      themeMode='dark'
      navPanel={
        <>
          {
            //ResourceWidget 内部会注册组件，要防止多次渲染
            <ResourceWidget display={activedKey === LeftNavType.compoents} />
          }
          <PagesWidget display={activedKey === LeftNavType.pages} value={pageId} onSelect={handleSelect} />
          <HistoryWidget display={activedKey === LeftNavType.history} />
          <OutlineWidget display={activedKey === LeftNavType.outline} />
        </>
      }
      topBar={
        <>
          <Logo />
          <Space>
            <ThemeButton />
            <LangButtons />
            <Button
              href="https://github.com/rxdrag/rxeditor"
              target="_blank"
              icon={<GithubFilled />}
            > Github</Button>
            <SaveButton />
          </Space>
        </>
      }
      locales={toolsLocales}
      leftNav={
        <LeftNavWidget
          //showTitle
          defaultActivedKey="components"
          items={[
            {
              key: LeftNavType.pages,
              title: "pages",
              icon: <FileOutlined style={{ fontSize: 18 }} />
            },
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
    >
    </RxEditorAntd>
  )
})