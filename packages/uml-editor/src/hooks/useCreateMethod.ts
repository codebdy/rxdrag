import { useCallback } from "react";
import { createUuid, ID } from "shared";
import {
  MethodMeta,
  MethodOperateType,
} from "../meta/MethodMeta";
import { Types } from "../meta/Type";
import { useGetTypeLabel } from "./useGetTypeLabel";

export function useCreateMethod(metaId: ID) {
  const getTypeName = useGetTypeLabel(metaId);

  const createMethod = useCallback(
    (methods: MethodMeta[]) => {
      let index = 1;
      const namePrefix = "newMethod";
      while (
        // eslint-disable-next-line no-loop-func
        methods?.find((mthd) => mthd.name === namePrefix + index)
      ) {
        index++;
      }

      const method = {
        uuid: createUuid(),
        name: namePrefix + index,
        args: [],
        type: Types.String,
        typeLabel: getTypeName(Types.String),
        operateType: MethodOperateType.Query,
      };

      return method;
    },
    [getTypeName]
  );

  return createMethod;
}
