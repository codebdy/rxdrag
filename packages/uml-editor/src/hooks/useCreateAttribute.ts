import { useCallback } from "react";
import { createUuid, ID } from "shared";
import { AttributeMeta } from "../meta/AttributeMeta";
import { Types } from "../meta/Type";
import { useGetTypeLabel } from "./useGetTypeLabel";

export function useCreateAttribute(metaId: ID, prefix?: string) {
  const getTypeName = useGetTypeLabel(metaId);

  const createAttribute = useCallback(
    (attributes: AttributeMeta[]) => {
      let index = 1;
      const namePrefix = prefix || "newAttribute";
      while (
        // eslint-disable-next-line no-loop-func
        attributes.find((attr) => attr.name === namePrefix + index)
      ) {
        index++;
      }

      const attr = {
        uuid: createUuid(),
        name: namePrefix + index,
        type: Types.String,
        typeLabel: getTypeName(Types.String),
      };

      return attr;
    },
    [getTypeName, prefix]
  );

  return createAttribute;
}
