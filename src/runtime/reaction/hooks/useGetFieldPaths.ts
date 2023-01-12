import { useCallback } from "react"
import { useField } from "runtime/fieldy/hooks/useField"
import { PREFIX_SIBLINGS } from "../classes/siblilings"

export function useGetFieldPaths() {
  const { basePath } = useField()

  const getFieldPaths = useCallback((fields: string[]) => {
    return fields.map(field => field.replace(PREFIX_SIBLINGS + ".", basePath ? (basePath + ".") : ""))
  }, [basePath])

  return getFieldPaths
}