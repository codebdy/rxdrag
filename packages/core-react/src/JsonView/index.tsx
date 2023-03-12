import { memo } from "react"
import Editor from '@monaco-editor/react';
import { useDocumentViewTypeState } from "core-react/hooks/useDocumentViewTypeState";
import { useThemeMode } from "core-react/hooks/useThemeMode";
import { useDocument } from "core-react/hooks/useDocument";

export const JsonView = memo((
  props: {
  }
) => {
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