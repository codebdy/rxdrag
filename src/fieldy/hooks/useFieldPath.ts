import { FieldPathContext } from "fieldy/contexts"
import { useContext } from "react"

export function useFieldPath(){
  const fieldPath = useContext<string | undefined>(FieldPathContext)

  return fieldPath
}