import { useEffect, useRef, useState } from "react";
import { IFieldSchema } from "@rxdrag/fieldy"
import { IFieldMeta } from "@rxdrag/fieldy";

const getPath = (parentPath: string, name: string) => {
  if (parentPath) {
    return parentPath + "." + name.trim()
  } else {
    return name.trim()
  }
}

function parseSchemas(fieldMeta: IFieldMeta, parentPath: string) {
  const arr = (fieldMeta.name as string)?.split(".") || []
  let currentPath = parentPath
  const schemas: IFieldSchema[] = []
  for (let i = 0; i < arr.length; i++) {
    const key = arr[i]
    currentPath = getPath(currentPath, key)
    if (i < arr.length - 1) {
      schemas.push({
        type: "object",
        path: currentPath,
        name: key,
      })
    } else {
      schemas.push({
        ...fieldMeta,
        path: currentPath,
        name: key,
      })
    }
  }

  return schemas
}

export function useFieldSchemas(fieldMeta: IFieldMeta, parentPath: string) {
  const [fieldSchemas, setFieldSchemas] = useState<IFieldSchema[]>()
  const fieldMetaRef = useRef(fieldMeta)
  fieldMetaRef.current = fieldMeta

  useEffect(() => {
    const schemas = parseSchemas(fieldMetaRef.current, parentPath)
    setFieldSchemas(schemas)
  }, [fieldMeta.name, parentPath])

  return fieldSchemas
}