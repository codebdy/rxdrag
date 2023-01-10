import { INodeSchema } from "core";
import { createSchema } from "react-shells/ant5/shared/createSchema";

export const cardSchema: INodeSchema = createSchema(undefined, [
  {
    componentName: "FormItem",
    props: {
      label: "$title",
    },
    children: [
      {
        componentName: "SlotSwitch",
        props: {
          name: "title"
        }
      }
    ]
  },
  {
    componentName: "FormItem",
    props: {
      label: "$extra",
    },
    children: [
      {
        componentName: "SlotSwitch",
        props: {
          name: "extra"
        }
      }
    ]
  },
  {
    componentName: "FormItem",
    props: {
      label: "$actions",
    },
    children: [
      {
        componentName: "SlotSwitch",
        props: {
          name: "actions"
        }
      }
    ]
  },
])