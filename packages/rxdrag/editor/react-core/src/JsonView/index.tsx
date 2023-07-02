import React from "react"
import { memo } from "react"
import Editor from '@monaco-editor/react';
import { useDocumentViewTypeState, useThemeMode, useDocument } from "../hooks";

export const JsonView = memo(() => {
  const doc = useDocument()
  const [viewType] = useDocumentViewTypeState(doc?.id)
  const themeMode = useThemeMode()
  const jsonStr = JSON.stringify(doc?.getSchemaTree() || {}, null, 2)

  return (
    viewType === "json"
      ? <Editor
        height="100%"
        language="json"
        theme={themeMode === "dark" ? "vs-dark" : "vs-light"}
        value={jsonStr}
      />
      : <></>
  )
})