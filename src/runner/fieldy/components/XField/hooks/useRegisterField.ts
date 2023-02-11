import { useEffect, useMemo, useState } from "react";
import { useFieldPath, useForm } from "runner/fieldy/hooks";
import { IField, IFieldMeta } from "runner/fieldy/interfaces";

export function useRegisterField(fieldMeta: IFieldMeta, value?:any) {
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
  const form = useForm()
  useEffect(() => {
    if (form && fieldMeta.name) {
      form?.registerField({ ...fieldMeta, path })
      return ()=>form?.unregisterField(path)
    }
  }, [fieldMeta, form, path])

  useEffect(() => {
    if (form) {
      const field = form?.getField( path)
      setField(field)
    }
  }, [form, path])

  return field
}