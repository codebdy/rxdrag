import { useCallback, useEffect, useState } from "react"
import { ActionType } from "../actions"
import { useEditorStore } from "./useEditorStore"
import { ILogicFlowDefinition } from "@rxdrag/schema"

export function useMetas() {
  const [metas, setMetas] = useState<ILogicFlowDefinition>()
  const store = useEditorStore()

  const handleMetasChange = useCallback((mts: ILogicFlowDefinition) => {
    setMetas(mts)
  }, [])

  const doSetMetas = useCallback((mts: ILogicFlowDefinition) => {
    store?.dispatch({ type: ActionType.SET_METAS, payload: mts })
  }, [store])

  useEffect(() => {
    const unsub = store?.subscribeMetasChange(handleMetasChange)
    return unsub
  }, [handleMetasChange, store])

  useEffect(() => {
    setMetas(store?.store.getState().metas)
  }, [store?.store])

  return { metas, setMetas: doSetMetas }
}