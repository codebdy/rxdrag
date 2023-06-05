import { IFieldMeta } from "@rxdrag/fieldy-schema";
import { ILogicFlowControllerMeta } from "@rxdrag/minions-runtime-react";
import { IBindParams } from "@rxdrag/react-runner";
import { INodeSchema } from "@rxdrag/schema";


export function attachFormItem(schemas?: INodeSchema<IFieldMeta<IBindParams>, ILogicFlowControllerMeta>[]): INodeSchema<IFieldMeta<IBindParams>, ILogicFlowControllerMeta>[] | undefined {
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
          params: {
            ...schema?.["x-field"]?.params,
            withBind: schema?.["x-field"]?.params?.withBind === undefined ? true : schema?.["x-field"]?.params?.withBind
          }
        }
      }
    ],
  }));
}
