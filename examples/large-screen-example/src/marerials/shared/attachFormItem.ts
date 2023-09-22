import { IFieldMeta } from "@rxdrag/fieldy";
import { ILogicFlowControllerMeta } from "@rxdrag/minions-runtime-react";
import { INodeSchema } from "@rxdrag/schema";

export function attachFormItem(schemas?: INodeSchema<IFieldMeta, ILogicFlowControllerMeta>[]): INodeSchema<IFieldMeta, ILogicFlowControllerMeta>[] | undefined {
  return schemas?.map(schema => ({
    componentName: "FormItem",
    props: {
      label: schema?.["x-field"]?.label,
    },
    children: [
      {
        ...schema,
        "x-field": {
          ...schema?.["x-field"],
        }
      }
    ],
  }));
}
