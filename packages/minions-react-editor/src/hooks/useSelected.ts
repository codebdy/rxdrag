import { useCallback, useEffect, useState } from "react";
import { useEditorStore } from "./useEditorStore";
import { ActionType } from "../actions";

export function useSelected() {
  const [selected, setSelected] = useState<string>()
  const store = useEditorStore()

  const handleSelectedChange = useCallback((selected: string | undefined) => {
    setSelected(selected)
  }, [])

  const doSetSelected = useCallback((selected: string | undefined) => {
    store?.dispatch({ type: ActionType.SELECTION, payload: selected })
  }, [store])

  useEffect(() => {
    const unsub = store?.subscribeSelectedChange(handleSelectedChange)
    return unsub
  }, [handleSelectedChange, store])

  useEffect(() => {
    setSelected(store?.store.getState().selected)
  }, [store?.store])

  return { selected, setSelected: doSetSelected }
}