import { useCallback } from "react"
import { ActionType } from "../../actions"
import { useEditorStore } from "../useEditorStore"

export function useBackup() {
  const { selected, metas, dispatch } = useEditorStore()
  
  const backup = useCallback(() => {
    dispatch({ type: ActionType.BACKUP, payload: { ...metas, selected } })
  }, [dispatch, metas, selected])

  return backup
}