import { useEffect, useMemo, useState } from "react";
import { useFieldPath, useFieldy, useFormName } from "runner/fieldy/hooks";
import { IField, IFieldMeta } from "runner/fieldy/interfaces";

export function useRegisterField(fieldMeta: IFieldMeta) {
  const [field, setField] = useState<IField>()
  const parentPath = useFieldPath() || ""
  const path = useMemo(() => {
    if (!fieldMeta.name) {
      return parentPath
    }
    if (parentPath) {
      return parentPath + "." + fieldMeta.name.trim()
    } else {
      return fieldMeta.name.trim()
    }
  }, [parentPath, fieldMeta.name])
  const fieldy = useFieldy()
  const formName = useFormName()
  useEffect(() => {
    if (formName) {
      fieldy?.registerField(formName, { ...fieldMeta, path })
      return fieldy?.unregisterField(formName, path)
    }
  }, [fieldMeta, fieldy, formName, path])

  useEffect(() => {
    if (formName) {
      const field = fieldy?.getField(formName, path)
      setField(field)
    }
  }, [fieldy, formName, path])

  return field
}