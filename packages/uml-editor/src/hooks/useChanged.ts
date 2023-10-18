import { useRecoilState, useRecoilValue } from "recoil";
import { useMetaId } from "./useMetaId";
import { changedState } from "../recoil/atoms";

export function useChanged() {
  const metaId = useMetaId();
  const changed = useRecoilValue(changedState(metaId));

  return changed;
}

export function useChangedState() {
  const metaId = useMetaId();

  return useRecoilState(changedState(metaId));
}