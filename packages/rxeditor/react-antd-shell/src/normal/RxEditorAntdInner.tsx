import React from "react"
import { memo, useEffect, useRef, useState } from "react"
import { Button as AntdButton, Space } from "antd"
import { LeftSidebar } from "./layouts/LeftSidebar"
import { GithubFilled } from "@ant-design/icons"
import { Topbar } from "./layouts/Topbar"
import { LeftNavWidget } from "./widgets/LeftNavWidget"
import { CenterContent } from "./layouts/CenterContent"
import { ToggleAblePane } from "./layouts/ToggleAblePane/ToggleAblePane"
import { ToggleType } from "./layouts/ToggleAblePane/ToggleButton"
import { LangButtons } from "./widgets/LangButtons"
import { SaveActions } from "./widgets/SaveActions"
import { ThemeButton } from "./widgets/ThemeButton"
import { DocumentView } from "./panels/DocumentView"
import { IDocument } from "@rxdrag/core"
import { INodeSchema } from "@rxdrag/schema"
import { Workbench } from "./panels"
import { ILocales } from "@rxdrag/locales"
import { useDesignerEngine, useThemeMode } from "@rxdrag/react-core"
import { commonLocales } from "../locales"
import { settingLocales, SettingsForm } from "../common"
import styled from "styled-components"
import classNames from "classnames"
import { createId } from "@rxdrag/shared"
import { componentsIcon, outlineIcon, historyIcon } from "@rxdrag/react-shared"

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-flow: column;
  background-color: ${props => props.theme.token?.colorBgBase};
`

export type Antd5EditorInnerProps = {
  leftNav?: React.ReactNode,
  topBar?: React.ReactNode,
  navPanel?: React.ReactNode,
  children?: React.ReactNode,
  locales?: ILocales,
  schema: INodeSchema,
}

export const RxEditorAntdInner = memo((props: Antd5EditorInnerProps) => {
  const { leftNav, topBar, navPanel, locales, schema, children } = props;
  const [doc, setDoc] = useState<IDocument>()
  const themeMode = useThemeMode()
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
      const document = engine.createDocument({
        schema,
        id: createId(),
      })
      engine.getActions().changeActivedDocument(document.id)
      setDoc(document)
    }
  }, [engine, schema])

  useEffect(() => {
    const langMgr = engine?.getLocalesManager()
    langMgr?.registerLocales(commonLocales)
    langMgr?.registerLocales(settingLocales)
    locales && langMgr?.registerLocales(locales)
  }, [engine, locales])

  return (
    <Container className={classNames(themeMode, "rx-editor")}>
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
          <DocumentView doc={doc} />
          {children}
        </CenterContent>
        <ToggleAblePane toggleType={ToggleType.right} width={360}>
          <SettingsForm />
        </ToggleAblePane>
      </Workbench>
    </Container>
  )
})
