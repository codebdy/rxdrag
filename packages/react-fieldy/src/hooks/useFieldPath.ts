import { FieldContext } from "../contexts"
import { useContext } from "react"
import { IField } from "@rxdrag/fieldy"

export function useFieldPath(){
  const fieldPath = useContext<IField|undefined>(FieldContext)?.path

  return fieldPath
}