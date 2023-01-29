import { IDesignerEngine, IDocument, INodeSchema } from "core"
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Designer } from "core-react/Designer"
import { SettingsForm } from "./SettingsForm"
import { Workbench } from "./pannels/Workbench/Workbench"
import { Button as AntdButton, Space } from "antd"
import { LeftSidebar } from "./layouts/LeftSidebar"
import { Logo } from "./widgets/Logo"
import { GithubFilled } from "@ant-design/icons"
import { Topbar } from "./layouts/Topbar"
import { LeftNavWidget } from "./widgets/LeftNavWidget"
import { CenterContent } from "./layouts/CenterContent"
import { componentsIcon, historyIcon, outlineIcon } from "./icons"
import { ToggleAblePane } from "./layouts/ToggleAblePane"
import { ToggleType } from "./layouts/ToggleAblePane/ToggleButton"
import { commmonLocales } from "./locales"
import { Root } from "../../core-react/Root"
import { ShellContainer } from "./pannels/ShellContainer"
import { LangButtons } from "./widgets/LangButtons"
import { SaveActions } from "./widgets/SaveActions"
import { ThemeButton } from "./widgets/ThemeButton"
import { ConfigRoot } from "./pannels/ShellContainer/ConfigRoot"
import { ILocales } from "core/interfaces/loacales"
import { DocumentView } from "./pannels/DocumentView"
import { settingLocales } from "./SettingsForm/locales"
import "./style.less"

export type Antd5EditorProps = {
  leftNav?: React.ReactNode,
  topBar?: React.ReactNode,
  navPanel?: React.ReactNode,
  themeMode?: "dark" | "light",
  children?: React.ReactNode,
  locales?: ILocales,
  schemas: INodeSchema,
  canvasUrl: string,
  previewUrl: string,
}

export const Antd5Editor = memo((props: Antd5EditorProps) => {
  const { leftNav, topBar, navPanel, locales, themeMode, schemas, children, canvasUrl, previewUrl } = props;
  const [doc, setDoc] = useState<IDocument>()
  const [engine, setEngine] = useState<IDesignerEngine>()
  const docRef = useRef<IDocument>()
  docRef.current = doc
  useEffect(() => {
    if (engine) {
      console.log("创建 document")
      if (docRef.current) {
        docRef.current.destory()
        docRef.current = undefined
      }
      const document = engine.createDocument(schemas)
      engine.getActions().changeActivedDocument(document.id)
      setDoc(document)
    }
  }, [engine, schemas])

  const handleReady = useCallback((eng: IDesignerEngine) => {
    const langMgr = eng.getLoacalesManager()
    langMgr.registerLocales(commmonLocales)
    langMgr.registerLocales(settingLocales)
    locales && langMgr.registerLocales(locales)
    //langMgr.registerResourceLocales(resourceLocales)
    //langMgr.registerComponentsLocales(componentLocales)
    setEngine(eng)
  }, [locales])

  const initialComponents = useMemo(() => {
    return [
      {
        componentName: "Root",
        component: Root,
        designer: Root,
      }
    ]
  }, [])
  return (
    <Designer
      onReady={handleReady}
      themeMode={themeMode}
      components={initialComponents}
    >
      <ConfigRoot>
        <ShellContainer>
          <Topbar >
            {
              topBar || <>
                <Logo />
                <Space>
                  <ThemeButton />
                  <LangButtons />
                  <AntdButton
                    href="https://github.com/rxdrag/rxeditor"
                    target="_blank"
                    icon={<GithubFilled />}
                  > Github</AntdButton>
                  <SaveActions />
                </Space>
              </>
            }
          </Topbar>
          <Workbench>
            <LeftSidebar>
              {
                leftNav || <LeftNavWidget
                  //showTitle
                  defaultActivedKey="components"
                  items={[
                    {
                      key: "components",
                      title: "components",
                      icon: componentsIcon
                    },
                    {
                      key: "outline",
                      title: "outline",
                      icon: outlineIcon
                    },
                    {
                      key: "history",
                      title: "history",
                      icon: historyIcon
                    },
                  ]}
                />
              }
            </LeftSidebar>
            <ToggleAblePane>
              {
                navPanel
              }
            </ToggleAblePane>
            <CenterContent>
              <DocumentView doc={doc} canvasUrl={canvasUrl} previewUrl = {previewUrl} />
              {children}
            </CenterContent>
            <ToggleAblePane toggleType={ToggleType.right} width={300}>
              <SettingsForm />
            </ToggleAblePane>
          </Workbench>
        </ShellContainer>
      </ConfigRoot>
    </Designer>
  )
})
