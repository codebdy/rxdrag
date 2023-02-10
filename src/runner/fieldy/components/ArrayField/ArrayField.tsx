import { memo, useEffect, useMemo, useRef } from "react"
import { useFieldPath, useFieldy, useFormName } from "runner/fieldy/hooks"
import { IFieldSchema } from "runner/fieldy/interfaces"
import { XField } from "../XField"

//动态增加字段用这个，否则不要碰它
export const ArrayField = memo((
  props: {
    name: string,
    value?: any[],
    children?: React.ReactNode
  }
) => {
  const { name, value, children } = props
  const parentPath = useFieldPath() || ""
  const formName = useFormName()
  const fieldy = useFieldy()
  const fieldPath = useMemo(() => {
    return parentPath + "." + name
  }, [name, parentPath])

  const formNameRef = useRef(formName)
  formNameRef.current = formName
  const fieldPathRef = useRef(fieldPath)
  fieldPathRef.current = fieldPath

  const fieldMeta: IFieldSchema = useMemo(() => {
    return {
      path: parentPath,
      type: "array",
      name
    }
  }, [name, parentPath])

  useEffect(() => {
    console.log("哈哈哈1", formName)
    if (formName) {
      const field = fieldy?.getField(formName, fieldPath)
      console.log("哈哈哈", field)
      if (!field) {
        fieldy?.addFieldMetas(formName, fieldMeta)
      }
      fieldy?.setFieldValue(formName, fieldPath, value)
    }
  }, [fieldMeta, fieldPath, fieldy, formName, value])

  useEffect(()=>{
    return()=>{
      if(formNameRef.current){
        fieldy?.removeFieldMetas(formNameRef.current, fieldPathRef.current)
      }
    }
  }, [fieldy])

  return (
    <XField fieldMeta={fieldMeta}>
      {children}
    </XField>
  )
})