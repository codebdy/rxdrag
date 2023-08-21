import React from "react"
import { memo, useEffect, useRef, useState } from "react"
import { SettingsForm, settingLocales } from "./SettingsForm"
import { Button as AntdButton, Space } from "antd"
import { LeftSidebar } from "./layouts/LeftSidebar"
import { GithubFilled } from "@ant-design/icons"
import { Topbar } from "./layouts/Topbar"
import { LeftNavWidget } from "./widgets/LeftNavWidget"
import { CenterContent } from "./layouts/CenterContent"
import { ToggleAblePane } from "./layouts/ToggleAblePane/ToggleAblePane"
import { ToggleType } from "./layouts/ToggleAblePane/ToggleButton"
import { ShellContainer } from "./panels/ShellContainer"
import { LangButtons } from "./widgets/LangButtons"
import { SaveActions } from "./widgets/SaveActions"
import { ThemeButton } from "./widgets/ThemeButton"
import { DocumentView } from "./panels/DocumentView"
import "./style.less"
import { IDocument } from "@rxdrag/core"
import { INodeSchema } from "@rxdrag/schema"
import { Workbench } from "./panels"
import { ILocales } from "@rxdrag/locales"
import { componentsIcon, outlineIcon, historyIcon } from "./icons"
import { useDesignerEngine } from "@rxdrag/react-core"
import { commonLocales } from "./locales"

export type Antd5EditorInnerProps = {
  leftNav?: React.ReactNode,
  topBar?: React.ReactNode,
  navPanel?: React.ReactNode,
  children?: React.ReactNode,
  locales?: ILocales,
  schemas: INodeSchema,
  canvasUrl: string,
  previewUrl: string,
}

export const RxEditorAntdInner = memo((props: Antd5EditorInnerProps) => {
  const { leftNav, topBar, navPanel, locales, schemas, children, canvasUrl, previewUrl } = props;
  const [doc, setDoc] = useState<IDocument>()
  const engine = useDesignerEngine()
  const docRef = useRef<IDocument>()
  docRef.current = doc
  useEffect(() => {
    if (engine) {
      console.log("创建 document")
      if (docRef.current) {
        docRef.current.destroy()
        docRef.current = undefined
      }
      const document = engine.createDocument(schemas)
      engine.getActions().changeActivedDocument(document.id)
      setDoc(document)
    }
  }, [engine, schemas])

  useEffect(() => {
    const langMgr = engine?.getLocalesManager()
    langMgr?.registerLocales(commonLocales)
    langMgr?.registerLocales(settingLocales)
    locales && langMgr?.registerLocales(locales)
  }, [engine, locales])

  return (
    <ShellContainer>
      <Topbar >
        {
          topBar || <>
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
  )
})
