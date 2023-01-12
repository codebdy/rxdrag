import { useField } from "fieldy/hooks/useField"
import { useCallback } from "react"
import { PREFIX_SIBLINGS } from "../siblilings"

export function useGetFieldPaths() {
  const { basePath } = useField()

  const getFieldPaths = useCallback((fields: string[]) => {
    return fields.map(field => field.replace(PREFIX_SIBLINGS + ".", basePath ? (basePath + ".") : ""))
  }, [basePath])

  return getFieldPaths
}