import { memo, useMemo } from "react"
import { LogicFlowEditorStoreContext } from "../contexts";
import { EditorStore } from "../classes";
import { useEditorStore } from "../hooks";

export const LogicFlowEditorScope = memo((
  props: {
    children?: React.ReactNode
  }
) => {
  const { children } = props;
  const parentStore = useEditorStore()
  const store: EditorStore = useMemo(() => {
    return new EditorStore()
  }, [])


  return (
    <LogicFlowEditorStoreContext.Provider value={parentStore || store}>
      {children}
    </LogicFlowEditorStoreContext.Provider>
  )
})