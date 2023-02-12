import { useEffect, useMemo, useState } from "react";
import { useFieldPath, useForm } from "runner/fieldy/hooks";
import { IField, IFieldMeta } from "runner/fieldy/interfaces";

export function useRegisterField(fieldMeta: IFieldMeta, initialValue?:any) {
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
      const field = form.registerField({ ...fieldMeta, path })
      field.setInitialValue(initialValue)
      setField(field)
      console.log("哈哈哈 注册并设置初", path, form, initialValue)
      return ()=>{
        form.unregisterField(path)
      }
    }
  }, [fieldMeta, form, initialValue, path])

  return field
}