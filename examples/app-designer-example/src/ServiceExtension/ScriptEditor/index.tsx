import { memo, useCallback, useEffect, useState } from "react"
import styled from "styled-components"
import { Toolbar } from "../../components/Toolbar"
import { Button } from "antd"
import { useTranslate } from "@rxdrag/react-locales"
import { useQueryExtensionScript } from "../../hooks/useQueryExtensionScript"
import { ID } from "@rxdrag/shared"
import MonacoEditor from '@monaco-editor/react'
import { useSaveExtensionScript } from "../../hooks/useSaveExtensionScript"
import { useAppThemeMode } from "../../hooks/useAppThemeMode"

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column;
`

export const ScriptEditor = memo((
  props: {
    id?: ID,
  }
) => {
  const { id } = props
  const [inputValue, setInputValue] = useState<string>("")
  const t = useTranslate()
  const { script } = useQueryExtensionScript(id)
  const themeMode = useAppThemeMode()
  const [save, { loading: saving }] = useSaveExtensionScript()

  useEffect(() => {
    setInputValue(script?.code || "")
  }, [script?.code, id])

  const handleEditorChange = useCallback((value?: string) => {
    setInputValue(value || "")
  }, [])

  const handleSave = useCallback(() => {
    if (script) {
      save({ ...script, code: inputValue })
    }
  }, [inputValue, save, script])

  return (
    <Container
      className="script-editor"
      style={{ display: id ? undefined : "none" }}
    >
      <Toolbar>
        <span>
          {script?.name}
        </span>
        <Button
          type="primary"
          loading={saving}
          disabled={(script?.code || "") === inputValue}
          onClick={handleSave}
        >
          {
            t("Save")
          }
        </Button>
      </Toolbar>
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
    </Container>
  )
})