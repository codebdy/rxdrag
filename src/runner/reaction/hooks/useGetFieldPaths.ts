import { useCallback } from "react"
import { useField } from "runner/fieldy/hooks/useField"
import { PREFIX_SIBLINGS } from "../classes/siblilings"

export function useGetFieldPaths() {
  const field = useField()

  const getFieldPaths = useCallback((fields: string[]) => {
    return fields.map(fieldName => fieldName.replace(PREFIX_SIBLINGS + ".", field?.basePath ? (field?.basePath + ".") : ""))
  }, [field?.basePath])

  return getFieldPaths
}