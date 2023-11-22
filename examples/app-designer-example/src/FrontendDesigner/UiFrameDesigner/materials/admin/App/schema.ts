import { SchemaOptions, createSchema } from "@rxdrag/react-antd-materials";
import { INodeSchema } from "@rxdrag/schema";

const scehmaOptions: SchemaOptions = {
  propSchemas: [
    {
      componentName: "Radio.Group",
      props: {
        optionType: "button",
        size: "small",
        options: [
          {
            label: "$dark",
            value: "dark"
          },
          {
            label: "$light",
            value: "light"
          },
        ],
        defaultValue: "light",
      },

      "x-data": {
        label: "$themeMode",
        name: "themeMode",
      }
    },
    {
      componentName: "ThemeTokenSetter",
      props: {
      },
      "x-data": {
        label: "$themeColor",
        name: "token",
      }
    }
  ],
}

export const schema: INodeSchema = createSchema(scehmaOptions)