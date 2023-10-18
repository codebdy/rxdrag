import { useCallback } from "react";
import { AttributeMeta } from "../meta/AttributeMeta";
import { ClassMeta } from "../meta/ClassMeta";
import { useChangeClass } from "./useChangeClass";
import { useCheckClassPropertyName } from "./useCheckClassPropertyName";
import { ID } from "shared";
import { useTranslation } from "react-i18next";

export function useChangeAttribute(metaId: ID) {
  const changeEntity = useChangeClass(metaId);
  const chackName = useCheckClassPropertyName(metaId);
  const { t } = useTranslation();
  
  const changeAttribute = useCallback(
    (attr: AttributeMeta, cls: ClassMeta) => {
      if (!chackName(cls.uuid, attr.name, attr.uuid)) {
        return t("ErrorNameRepeat");
      }
      changeEntity({
        ...cls,
        attributes: cls.attributes.map((col) =>
          col.uuid === attr.uuid ? attr : col
        ),
      });
    },
    [chackName, changeEntity, t]
  );

  return changeAttribute;
}
