import { useCallback, useEffect, useState } from "react"
import { ILogicMetas } from "runner/minions/interfaces/metas"
import { ActionType } from "../actions"
import { useEditorStore } from "./useEditorStore"

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
    setMetas(store?.store.getState().metas)
  }, [store?.store])

  return { metas, setMetas: doSetMetas }
}