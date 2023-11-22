import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { classesState } from "../recoil/atoms";
import { useGetFirstParentIds } from "./useGetFirstParentIds";
import { ID } from "@rxdrag/shared";
import { StereoType } from "@rxdrag/uml-schema";

export function useRootClasses(metaId: ID) {
  const classes = useRecoilValue(classesState(metaId));
  const getParentuuids = useGetFirstParentIds(metaId);
  const entities = useMemo(() => {
    return classes.filter(
      (cls) =>
        (cls.stereoType === StereoType.Entity ||
          cls.stereoType === StereoType.Abstract) &&
        getParentuuids(cls.uuid).length === 0
    );
  }, [classes, getParentuuids]);

  return entities;
}
