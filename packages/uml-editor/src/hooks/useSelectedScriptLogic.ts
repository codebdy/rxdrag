import { scriptLogicsState, selectedScriptLogicIdState } from "UmlEditor/recoil/atoms";
import { useRecoilValue } from "recoil";
import { useMetaId } from "./useMetaId";

export function useSelectedScriptLogic() {
  const metaId = useMetaId();
  const scripts = useRecoilValue(scriptLogicsState(metaId))
  const selectId = useRecoilValue(selectedScriptLogicIdState(metaId))

  return scripts?.find(script=>script.uuid === selectId)
}