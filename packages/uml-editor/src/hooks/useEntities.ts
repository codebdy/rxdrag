import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { classesState } from "../recoil/atoms";
import { ID } from "@rxdrag/shared";
import { StereoType } from "@rxdrag/uml-schema";

export function useEntities(metaId: ID) {
  const classes = useRecoilValue(classesState(metaId));
  const entities = useMemo(() => {
    return classes.filter((cls) => cls.stereoType === StereoType.Entity);
  }, [classes]);

  return entities;
}
