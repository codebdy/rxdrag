import React from "react"
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { SettingsForm } from "./SettingsForm"
import { Button as AntdButton, Space } from "antd"
import { LeftSidebar } from "./layouts/LeftSidebar"
import { Logo } from "./widgets/Logo"
import { GithubFilled } from "@ant-design/icons"
import { Topbar } from "./layouts/Topbar"
import { LeftNavWidget } from "./widgets/LeftNavWidget"
import { CenterContent } from "./layouts/CenterContent"
import { ToggleAblePane } from "./layouts/ToggleAblePane/ToggleAblePane"
import { ToggleType } from "./layouts/ToggleAblePane/ToggleButton"
import { commmonLocales } from "./locales"
import { ShellContainer } from "./pannels/ShellContainer"
import { LangButtons } from "./widgets/LangButtons"
import { SaveActions } from "./widgets/SaveActions"
import { ThemeButton } from "./widgets/ThemeButton"
import { ConfigRoot } from "./pannels/ShellContainer/ConfigRoot"
import { DocumentView } from "./pannels/DocumentView"
import { settingLocales } from "./SettingsForm/locales"
import "./style.less"
import { IDocument, IDesignerEngine } from "@rxdrag/core"
import { Root, Designer } from "@rxdrag/react-core"
import { INodeSchema } from "@rxdrag/schema"
import { Workbench } from "./pannels"
import { ILocales } from "@rxdrag/locales"
import { componentsIcon, outlineIcon, historyIcon } from "./icons"
import { IMinionOptions, MinionOptionContext } from "./contexts"

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
  //逻辑编排配置项
  minionOptions?: IMinionOptions,
}

export const RxEditorAntd = memo((props: Antd5EditorProps) => {
  const { leftNav, topBar, navPanel, locales, themeMode, schemas, children, canvasUrl, previewUrl, minionOptions } = props;
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
    <MinionOptionContext.Provider value={minionOptions}>
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
                <DocumentView doc={doc} canvasUrl={canvasUrl} previewUrl={previewUrl} />
                {children}
              </CenterContent>
              <ToggleAblePane toggleType={ToggleType.right} width={360}>
                <SettingsForm />
              </ToggleAblePane>
            </Workbench>
          </ShellContainer>
        </ConfigRoot>
      </Designer>
    </MinionOptionContext.Provider>
  )
})
