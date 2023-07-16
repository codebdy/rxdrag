import { memo, useMemo } from "react"
import { LogicFlowEditorStoreContext } from "../contexts";
import { EditorStore } from "../classes";
import { useEditorStore } from "../hooks";

const ScopeInner = memo((props: {
  children?: React.ReactNode
}) => {
  const { children } = props;
  const store: EditorStore = useMemo(() => {
    return new EditorStore()
  }, [])

  return (
    <LogicFlowEditorStoreContext.Provider value={store}>
        {children}
    </LogicFlowEditorStoreContext.Provider>
  )
})

export const LogicFlowEditorScope = memo((
  props: {
    children?: React.ReactNode
  }
) => {
  const { children } = props;
  const parentStore = useEditorStore()

  return (
    parentStore ?
      <>{children}</>
      :
      <ScopeInner>
        {children}
      </ScopeInner>
  )
})