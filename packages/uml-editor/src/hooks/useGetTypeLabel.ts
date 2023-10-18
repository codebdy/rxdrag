import { useCallback } from "react";
import { ID } from "shared";
import { Type, Types } from "../meta/Type";
import { useGetClass } from "./useGetClass";

export function useGetTypeLabel(metaId: ID) {
  const getClass = useGetClass(metaId);

  const typeName = useCallback(
    (type: Type, typeUuid?: string): string => {
      const cls = getClass(typeUuid || "");
      if (cls) {
        if (
          type === Types.Enum ||
          type === Types.ValueObject ||
          type === Types.Entity
        ) {
          return cls.name;
        } else if (
          type === Types.EnumArray ||
          type === Types.ValueObjectArray ||
          type === Types.EntityArray
        ) {
          return `${cls.name}[]`;
        }

        return ""
      }
      return type;
    },
    [getClass]
  );

  return typeName;
}
