import { useCallback, useEffect, useState } from "react"
import { ActionType } from "../actions"
import { useEditorStore } from "./useEditorStore"
import { ILogicMetas } from "../interfaces"

export function useMetas() {
  const [metas, setMetas] = useState<ILogicMetas>()
  const store = useEditorStore()

  const handleMetasChange = useCallback((mts: ILogicMetas) => {
    setMetas(mts)
  }, [])

  const doSetMetas = useCallback((mts: ILogicMetas) => {
    store?.dispatch({ type: ActionType.SET_METAS, payload: mts })
  }, [store])

  useEffect(() => {
    const unsub = store?.subscribeMetasChange(handleMetasChange)
    return unsub
  }, [handleMetasChange, store])

  useEffect(() => {
    const state = store?.store.getState()
    setMetas({ lines: state?.lines || [], nodes: state?.nodes || [] })
  }, [store?.store])

  return { metas, setMetas: doSetMetas }
}