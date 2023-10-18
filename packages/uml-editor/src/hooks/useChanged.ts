import { useRecoilValue } from "recoil";
import { useMetaId } from "./useMetaId";
import { changedState } from "UmlEditor/recoil/atoms";

export function useChanged(){
  const metaId = useMetaId();
  const changed = useRecoilValue(changedState(metaId));

  return changed;
}