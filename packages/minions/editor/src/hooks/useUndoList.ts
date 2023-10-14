import { useCallback, useEffect, useState } from "react"
import { ISnapshot } from "../interfaces/state"
import { useEditorStore } from "./useEditorStore"
import { ActionType } from "../actions"

export function useUndoList() {
  const [undoList, setUndoList] = useState<ISnapshot[]>([])
  const store = useEditorStore()

  const handleUndoListChange = useCallback((undos: ISnapshot[]) => {
    setUndoList(undos)
  }, [])

  const doSetUndoList = useCallback((undos: ISnapshot[]) => {
    store?.dispatch({ type: ActionType.SET_UNOLIST, payload: undos })
  }, [store])

  useEffect(() => {
    const unsub = store?.subscribeUndoLisrtChange(handleUndoListChange)
    return unsub
  }, [handleUndoListChange, store])

  useEffect(() => {
    setUndoList(store?.store.getState().undoList || [])
  }, [store?.store])

  return { undoList, setUndoList: doSetUndoList }
}