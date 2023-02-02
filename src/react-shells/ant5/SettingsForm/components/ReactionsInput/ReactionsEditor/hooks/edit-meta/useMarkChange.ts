import { useCallback } from "react";
import { ActionType } from "../../actions";
import { useEditorStore } from "../useEditorStore";

export function useMarkChange() {
  const { changeFlag, dispatch } = useEditorStore()
  const markChange = useCallback(() => {
    dispatch({ type: ActionType.SET_CHANGE_FLAG, payload: changeFlag + 1 })
  }, [changeFlag, dispatch])

  return markChange;
}