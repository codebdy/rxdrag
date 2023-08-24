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
import { SaveButton } from "./widgets/SaveButton"
import { PagesWidget } from "./PagesWidget"
import { pages } from "./data"
import { Logo, MenuButton, ResourceWidget, controllerDefines, materials, minionsLocales, minionsMaterialCategories } from "example-common"
import { setterLocales } from "@rxdrag/react-antd-materials/src/materials/displays/Tag/locales"

export enum LeftNavType {
  pages = "pages",
  components = "components",
  outline = "outline",
  history = "history",
}

export const NormalEditorExample = memo(() => {
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
      materials={materials}
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
      locales={setterLocales}
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