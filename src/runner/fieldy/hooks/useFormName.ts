import { FormNameContext } from "runner/fieldy/contexts"
import { useContext } from "react"

export function useFormName() {
  const formName = useContext<string | undefined>(FormNameContext)
  return formName
}