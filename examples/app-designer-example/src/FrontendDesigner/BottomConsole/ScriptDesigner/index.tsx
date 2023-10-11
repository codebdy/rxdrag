import { memo, useCallback, useEffect, useState } from "react"
import styled from "styled-components"
import { Button, Tooltip } from "antd"
import { CloseOutlined, CodeOutlined, FunctionOutlined } from "@ant-design/icons"
import { Scripts } from "./Scripts"
import { LeftNav } from "../common/LeftNav"
import { LeftColumn } from "../common/LeftColumn"
import { Container } from "../common/Container"
import { PanelTitle } from "../common/PanelTitle"
import { FXes } from "./FXes"
import { ToolbarTitle } from "../common/ToolbarTitle"
import { ID } from "@rxdrag/shared"
import MonacoEditor from '@monaco-editor/react'
import { useThemeMode } from "@rxdrag/react-core"
import { NavButton } from "../common/NavButton"
import { useQueryScript } from "../../../hooks/useQueryScript"
import { useSaveScript } from "../../../hooks/useSaveScript"

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-flow: column;
  &.hidden{
    display: none;
  }
`

const EditorContainer = styled.div`
  flex:1;
  width: 800px;
`

const Toolbar = styled.div`
  display: flex;
  height: 40px;
  padding: 0 16px;
  padding-right: 8px;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  border-bottom: solid 1px ${props => props.theme?.token?.colorBorderSecondary};
`

enum NavType {
  flows = "flows",
  fxes = "fxes",
}

export const ScriptDesigner = memo(() => {
  const [navType, setNavType] = useState<NavType | null>(NavType.flows)
  const [selectedScript, setSelectedScript] = useState<ID | null>(null)
  const [selectedFx, setSelectedFx] = useState<ID | null>(null)
  const [inputValue, setInputValue] = useState<string>()
  const themeMode = useThemeMode()
  const { script } = useQueryScript(selectedScript || selectedFx || "")
  const [save, { loading: saving }] = useSaveScript()

  useEffect(() => {
    setInputValue(script?.code || "")
  }, [script])

  const handleToggleFlows = useCallback(() => {
    setNavType(type => type === NavType.flows ? null : NavType.flows)
  }, [])

  const handleToggleFxes = useCallback(() => {
    setNavType(type => type === NavType.fxes ? null : NavType.fxes)
  }, [])

  const handleCloseLeft = useCallback(() => {
    setNavType(null)
  }, [])

  const handleSelectScript = useCallback((id: ID) => {
    setSelectedScript(id)
    setSelectedFx(null)
  }, [])


  const handleSelectFx = useCallback((id: ID) => {
    setSelectedScript(null)
    setSelectedFx(id)
  }, [])

  const handleEditorChange = useCallback((value?: string) => {
    setInputValue(value)
  }, [])

  const handleSave = useCallback(() => {
    if (script) {
      save({ ...script, code: inputValue })
    }
  }, [inputValue, save, script])

  return (
    <Container>
      <LeftNav>
        <Tooltip title="执行脚本" placement="right">
          <NavButton
            type={
              navType === NavType.flows
                ? "primary"
                : (selectedScript ? "link" : "text")
            }
            className={selectedScript ? "intermediate" : undefined}
            icon={<CodeOutlined />}
            onClick={handleToggleFlows}
          />
        </Tooltip>
        <Tooltip title="通用代码" placement="right">
          <NavButton
            type={
              navType === NavType.fxes
                ? "primary"
                : (selectedFx ? "link" : "text")
            }
            className={selectedFx ? "intermediate" : undefined}
            icon={<FunctionOutlined />}
            onClick={handleToggleFxes}
          />
        </Tooltip>
      </LeftNav>

      <LeftColumn
        className={!navType ? "hidden" : undefined}
        //className="fixed"
        width={260}
        maxWidth={500}
        minWidth={160}
      >
        <PanelTitle>
          {
            NavType.flows === navType &&
            <span>
              执行脚本
            </span>
          }
          {
            NavType.fxes === navType &&
            <span>
              通用代码
            </span>
          }
          <Button
            type="text"
            size="small"
            icon={<CloseOutlined />}
            onClick={handleCloseLeft}
          />
        </PanelTitle>
        <Scripts
          display={navType === NavType.flows}
          selected={selectedScript}
          onSelect={handleSelectScript}
        />
        <FXes
          selected={selectedFx}
          display={navType === NavType.fxes}
          onSelect={handleSelectFx}
        />
      </LeftColumn>
      <Content
        className={!script ? "hidden" : undefined}
      >
        <Toolbar>
          <ToolbarTitle>
            {selectedFx ? <FunctionOutlined /> : <CodeOutlined />}
            <span className="text">{script?.name}</span>
          </ToolbarTitle>
          <Button
            type="primary"
            loading={saving}
            disabled={script?.code === inputValue}
            onClick={handleSave}
          >
            保存
          </Button>
        </Toolbar>
        <EditorContainer>
          <MonacoEditor
            height="100%"
            language="javascript"
            value={inputValue}
            options={{
              theme: themeMode === "dark" ? "vs-dark" : "light",
              //不起作用，有空解决
              automaticLayout: true,
            }}
            onChange={handleEditorChange}
          />
        </EditorContainer>
      </Content>
    </Container>
  )
})