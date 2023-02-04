import { useCallback } from "react";
import { useChangeFlag } from "../useChangeFlag";

export function useMarkChange() {
  const { changeFlag, setChangeFlag } = useChangeFlag()

  const markChange = useCallback(() => {
    setChangeFlag(changeFlag + 1)
  }, [changeFlag, setChangeFlag])

  return markChange;
}