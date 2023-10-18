import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { classesState } from "../recoil/atoms";
import { ID } from "@rxdrag/shared";
import { StereoType } from "@rxdrag/uml-schema";

export function useEnums(metaId: ID) {
  const entities = useRecoilValue(classesState(metaId));
  const enums = useMemo(() => {
    return entities.filter((entity) => entity.stereoType === StereoType.Enum);
  }, [entities]);

  return enums;
}
