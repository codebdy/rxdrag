import { IFieldMeta } from "@rxdrag/fieldy";
import { IControllerMeta } from "@rxdrag/minions-runtime-react";
import { INodeSchema } from "@rxdrag/schema";

export function attachFormItem(schemas?: INodeSchema<IFieldMeta, IControllerMeta>[]): INodeSchema<IFieldMeta, IControllerMeta>[] | undefined {
  return schemas?.map(schema => ({
    componentName: "FormItem",
    props: {
      label: schema?.["x-data"]?.label,
    },
    children: [
      {
        ...schema,
        "x-data": {
          ...schema?.["x-data"],
        }
      }
    ],
  }));
}
