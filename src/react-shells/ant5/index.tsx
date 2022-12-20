import { IDesignerEngine, IDocument } from "core"
import { memo, useCallback, useMemo, useState } from "react"
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

export type Antd5EditorProps = {
  leftNav?: React.ReactNode,
  topBar?: React.ReactNode,
  navPanel?: React.ReactNode,
  themeMode?: "dark" | "light",
  children?: React.ReactNode,
  locales?: ILocales,
}

export const Antd5Editor = memo((props: Antd5EditorProps) => {
  const { leftNav, topBar, navPanel, locales, themeMode } = props;
  const [doc, setDoc] = useState<IDocument>()


  const handleReady = useCallback((engine: IDesignerEngine) => {
    const langMgr = engine.getLoacalesManager()
    langMgr.registerLocales(commmonLocales)
    langMgr.registerLocales(settingLocales)
    locales && langMgr.registerLocales(locales)
    //langMgr.registerResourceLocales(resourceLocales)
    //langMgr.registerComponentsLocales(componentLocales)
    const document = engine.createDocument({
      componentName: "Root"
    })
    setDoc(document)
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
      themMode={themeMode}
      components={initialComponents}
    >
      <ConfigRoot>
        <ShellContainer>
          <Topbar >
            {
              topBar || <>
                {/* <Space>
                  <Button type="text" icon={<MenuOutlined />}></Button>
                </Space> */}
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
              <DocumentView doc={doc} />
            </CenterContent>
            <ToggleAblePane toggleType={ToggleType.right}>
              <SettingsForm />
            </ToggleAblePane>
          </Workbench>
        </ShellContainer>
      </ConfigRoot>
    </Designer>
  )
})
