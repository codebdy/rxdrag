import { FileOutlined, GithubFilled } from "@ant-design/icons"
import { Button, Space } from "antd"
import { memo, useCallback, useMemo, useState } from "react"
import {
  RxEditorAntd,
  HistoryWidget,
  LangButtons,
  LeftNavWidget,
  OutlineWidget,
  ThemeButton,
  componentsIcon,
  historyIcon,
  outlineIcon,
} from "@rxdrag/react-antd-shell"
import { toolsLocales } from "../locales"
import { ResourceWidget } from "./ResourceWidget"
import { SaveButton } from "./widgets/SaveButton"
import { PagesWidget } from "./PagesWidget"
import { pages } from "./data"
import { minionsLocales } from "normal/controller/locales"
import { minionsMaterialCategories } from "normal/controller/materials"
import { controllerDefines } from "normal/controller/defines"
import { Logo, MenuButton } from "example-common"

export enum LeftNavType {
  pages = "pages",
  components = "components",
  outline = "outline",
  history = "history",
}

export const Antd5Example = memo(() => {
  const [pageId, setPageId] = useState("dashboard")
  const [activedKey, setActivedKey] = useState<LeftNavType>(LeftNavType.components)
  const handleActive = useCallback((key: string) => {
    setActivedKey(key as LeftNavType)
  }, [])

  const schemas = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      minionOptions={{
        materials: minionsMaterialCategories,
        locales: minionsLocales,
        controllers: controllerDefines,
      }}
      navPanel={
        <>
          {
            //ResourceWidget 内部会注册组件，要防止多次渲染
            <ResourceWidget display={activedKey === LeftNavType.components} />
          }
          <PagesWidget display={activedKey === LeftNavType.pages} value={pageId} onSelect={handleSelect} />
          <HistoryWidget display={activedKey === LeftNavType.history} />
          <OutlineWidget display={activedKey === LeftNavType.outline} />
        </>
      }
      topBar={
        <>
          <Space>
            <Logo title="Normal" />
          </Space>
          <Space>
            <ThemeButton />
            <LangButtons />
            <Button
              href="https://github.com/rxdrag/rxeditor"
              target="_blank"
              icon={<GithubFilled />}
            > Github</Button>
            <SaveButton />
            <MenuButton />
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
              key: LeftNavType.components,
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