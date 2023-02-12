import { useEffect, useState } from "react";
import { IFieldMeta, IFieldSchema } from "runner/fieldy/interfaces";

const getPath = (parentPath: string, name: string) => {
  if (parentPath) {
    return parentPath + "." + name.trim()
  } else {
    return name.trim()
  }
}

export function useFieldSchemas(fieldMeta: IFieldMeta, parentPath: string) {
  const [fieldSchemas, setFieldSchemas] = useState<IFieldSchema[]>()

  useEffect(() => {
    const arr = fieldMeta.name?.split(".") || []
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
    setFieldSchemas(schemas)
  }, [fieldMeta, fieldMeta.name, parentPath])

  return fieldSchemas
}