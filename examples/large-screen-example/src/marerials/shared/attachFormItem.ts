import { IFieldMeta } from "@rxdrag/fieldy";
import { IControllerMeta } from "@rxdrag/minions-runtime-react";
import { INodeSchema } from "@rxdrag/schema";

export function attachFormItem(schemas?: INodeSchema<IFieldMeta, IControllerMeta>[]): INodeSchema<IFieldMeta, IControllerMeta>[] | undefined {
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
