import { FieldContext } from "runner/fieldy/contexts"
import { useContext } from "react"
import { IField } from "../interfaces"

export function useFieldPath(){
  const fieldPath = useContext<IField|undefined>(FieldContext)?.path

  return fieldPath
}