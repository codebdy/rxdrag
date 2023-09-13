import { IFieldSchema } from "@rxdrag/fieldy";
import { FormItem, FormItemProps } from "@rxdrag/react-antd-components";
import { useNode } from "@rxdrag/react-core";
import { memo } from "react";

export const FormItemDesigner = memo((props: FormItemProps) => {
  const node = useNode()
  const fieldMeta = node?.meta?.["x-field"] as IFieldSchema | undefined
  return <FormItem required={fieldMeta?.validateRules?.required} {...props} />
},)