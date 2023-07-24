import { memo, useMemo } from "react"
import { LogicFlowEditorStoreContext } from "../contexts";
import { EditorStore } from "../classes";
import { useEditorStore } from "../hooks";

//用于创建全局EditorStore，并通过Context下发
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

//编辑器Scope定义
export const LogicFlowEditorScope = memo((
  props: {
    children?: React.ReactNode
  }
) => {
  const { children } = props;
  const parentStore = useEditorStore()

  return (
    //如果外层已经创建Scope，那么直接用外层的，反之新建一个
    parentStore ?
      <>{children}</>
      :
      <ScopeInner>
        {children}
      </ScopeInner>
  )
})