import { ITreeNode } from "@rxdrag/core";
import { IFieldMeta } from "@rxdrag/fieldy-schema";
import { ILogicFlowControllerMeta } from "@rxdrag/minions-runtime-react";
import { INodeSchema } from "@rxdrag/schema";
import { useCallback } from "react";

//本钩子依赖schema格式，有可能会不准确
export function useFillControllerProps() {

  //去的props字段
  const getPropsField = useCallback((schema: INodeSchema<IFieldMeta> | undefined): INodeSchema | undefined => {
    if (schema?.["x-field"]?.name === "props") {
      return schema
    } else {
      for (const child of schema?.children || []) {
        const fieldScehma = getPropsField(child as INodeSchema<IFieldMeta>)
        if (fieldScehma) {
          return fieldScehma;
        }
      }

      for (const slotName of Object.keys(schema?.slots || {})) {
        const child = schema?.slots?.[slotName];
        if (child) {
          const fieldScehma = getPropsField(child as INodeSchema<IFieldMeta>)
          if (fieldScehma) {
            return fieldScehma;
          }
        }
      }
    }
  }, [])

  const getSchemaFields = useCallback((schema: INodeSchema<IFieldMeta> | undefined, props: string[]) => {
    if (!schema) {
      return
    }
    if (schema["x-field"]?.name && schema["x-field"]?.name !== "props") {
      props.push(schema["x-field"]?.name)
    } else {
      for (const child of schema.children || []) {
        getSchemaFields(child as INodeSchema<IFieldMeta>, props)
      }

      for (const slotName of Object.keys(schema.slots || {})) {
        const child = schema.slots?.[slotName];
        child && getSchemaFields(child as INodeSchema<IFieldMeta>, props)
      }
    }
  }, [])
  const fill = useCallback((controllerMeta: ILogicFlowControllerMeta, node?: ITreeNode<INodeSchema, ILogicFlowControllerMeta>) => {
    const props: string[] = []
    getSchemaFields(getPropsField(node?.propsSchema as INodeSchema<IFieldMeta>) as INodeSchema<IFieldMeta>, props)
    return { ...controllerMeta, props }
  }, [getPropsField, getSchemaFields])

  return fill
}