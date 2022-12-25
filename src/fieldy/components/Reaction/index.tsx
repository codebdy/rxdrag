import { useFieldy, useFormName } from "fieldy/hooks"
import { useField } from "fieldy/hooks/useField"
import { memo, useCallback, useEffect } from "react"

const PREFIX_SIBLINGS = "$siblings"
const PREFIX_SELF = "$self"

const $siblings = {}
const $self = {}

export const Reaction = memo((
  props: {
    children?: React.ReactNode
  }
) => {
  const fieldy = useFieldy()
  const { fieldMeta, basePath } = useField()
  const formName = useFormName()
  const reactionParams = fieldMeta?.effects?.onFieldsValueChange
  const getFieldPaths = useCallback((fields: string[]) => {
    return fields.map(field => field.replace(PREFIX_SIBLINGS + ".", basePath ? (basePath + ".") : ""))
  }, [basePath])

  const handleFieldsValueChange = useCallback((newValues: any[], prevousValues: any[]) => {
    if(reactionParams?.jsCode){
      // eslint-disable-next-line no-new-func
      const func = new Function (PREFIX_SIBLINGS, PREFIX_SELF, reactionParams.jsCode)
      func($siblings, $self)
    }
  }, [reactionParams?.jsCode])

  useEffect(() => {
    if (reactionParams?.fields && formName) {
      const unsub = fieldy?.subscribeToFieldsValueChange(formName, getFieldPaths(reactionParams.fields), handleFieldsValueChange)
      return unsub
    }

  }, [fieldy, formName, getFieldPaths, handleFieldsValueChange, reactionParams?.fields])

  return (
    <>
      {props.children}
    </>
  )
})