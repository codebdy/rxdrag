
import { IForm } from "@rxdrag/fieldy"
import { useContext } from "react"
import { FormContext } from "../contexts"

export function useForm() {
  const form = useContext<IForm | undefined>(FormContext)
  return form
}