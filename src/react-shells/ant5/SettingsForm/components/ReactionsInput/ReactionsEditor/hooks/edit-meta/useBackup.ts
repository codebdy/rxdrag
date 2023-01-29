import { useCallback } from "react"
import { ActionType } from "../../actions"
import { useEditorState } from "../useEditorState"

export function useBackup() {
  const { selected, metas, dispatch } = useEditorState()
  
  const backup = useCallback(() => {
    dispatch({ type: ActionType.BACKUP, payload: { ...metas, selected } })
  }, [dispatch, metas, selected])

  return backup
}