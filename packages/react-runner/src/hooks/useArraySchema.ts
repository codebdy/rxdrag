import { useMemo } from "react"
import { IComponentRenderSchema } from "../ComponentView"
import { useComponentSchema } from "./useComponentSchema"

export function useArraySchema() {
  const schema = useComponentSchema()
  const childrenSchema: IComponentRenderSchema = useMemo(() => {
    return {
      id: "array-children-" + schema?.["x-controller"]?.id,
      componentName: "Fragment",
      children: schema?.children,
    }
  }, [schema])

  return { schema, childrenSchema }
}