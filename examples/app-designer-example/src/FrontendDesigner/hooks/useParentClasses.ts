import { useState } from "react"
import { useMeta } from "./useMeta"
import { ClassMeta } from "@rxdrag/uml-schema"

export function useParentClasses(id?: string) {
  const [classes, setClasses] = useState<ClassMeta[]>()
  const meta = useMeta()

  const getParent = () => {

  }

  return classes
}