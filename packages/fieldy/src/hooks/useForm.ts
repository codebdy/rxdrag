import { FormContext } from "runner/fieldy/contexts"
import { useContext } from "react"
import { IForm } from "../interfaces"

export function useForm() {
  const form = useContext<IForm | undefined>(FormContext)
  return form
}