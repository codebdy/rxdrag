import { apisState, selectedApiIdState } from "UmlEditor/recoil/atoms";
import { useRecoilValue } from "recoil";
import { useMetaId } from "./useMetaId";

export function useSelectedApi() {
  const metaId = useMetaId();
  const apis = useRecoilValue(apisState(metaId))
  const selectId = useRecoilValue(selectedApiIdState(metaId))

  return apis?.find(api=>api.uuid === selectId)
}