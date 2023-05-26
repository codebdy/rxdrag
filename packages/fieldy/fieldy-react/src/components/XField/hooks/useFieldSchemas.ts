import { useEffect, useState } from "react";
import { IFieldSchema } from "@rxdrag/fieldy"
import { makeRxId } from "@rxdrag/shared";
import { IFieldMeta } from "@rxdrag/fieldy-schema";

const getPath = (parentPath: string, name: string) => {
  if (parentPath) {
    return parentPath + "." + name.trim()
  } else {
    return name.trim()
  }
}

function parseSchemas(fieldMeta: IFieldMeta, parentPath: string) {
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

  return schemas
}

function parseFragmentSchemas(fieldMeta: IFieldMeta, parentPath: string) {
  const schemas: IFieldSchema[] = []
  //必须要有名字，要不然检索不到fragment字段
  const name = fieldMeta.name || makeRxId()
  for (const subMedia of fieldMeta.fragmentFields||[]){
    schemas.push({
      ...subMedia,
      path: parentPath + "." + subMedia.name,
    })
  }
  schemas.push(
    {
      ...fieldMeta,
      path: parentPath + "." + name,
      name: name
    }
  )
  return schemas
}

export function useFieldSchemas(fieldMeta: IFieldMeta, parentPath: string) {
  const [fieldSchemas, setFieldSchemas] = useState<IFieldSchema[]>()

  useEffect(() => {
    let schemas
    if (fieldMeta.type === "fragment") {
      schemas = parseFragmentSchemas(fieldMeta, parentPath)
    } else {
      schemas = parseSchemas(fieldMeta, parentPath)
    }
    setFieldSchemas(schemas)
  }, [fieldMeta, fieldMeta.name, parentPath])

  return fieldSchemas
}