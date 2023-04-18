import { INodeSchema } from "@rxdrag/schema";
import { createControllerSchema } from "./createControllerSchema";
import { displaySetter, backgroundSetter, fontStyleSetter, martinStyleSetter, paddingStyleSetter, borderRediusSetter, borderSetter } from "./schemas";
import { createFieldSchema } from "./createFieldSchema";
import { SchemaOptions } from "./SchemaOptions";

export type SlotsOption = {
  name: string,
  label: string,
}

export function createSlotsSchema(...options: SlotsOption[]) {
  return options.map((opt) => {
    return ({
      componentName: "SlotSwitch",
      props: {
        name: opt.name
      },
      "x-field": {
        label: opt.label,
      }
    })
  })
}

export function createSchema(options: SchemaOptions = {}): INodeSchema {
  const { propsSchemas, slotsSchemas, logicOptions: fieldOptions } = options
  const propsTab = propsSchemas ? [{
    componentName: "TabPanel",
    "x-field": {
      type: "object",
      name: "props",
    },
    props: {
      title: "$properties"
    },
    children: [
      ...propsSchemas || []
    ]
  }] : [];

  const slotsTab = slotsSchemas ? [{
    componentName: "TabPanel",
    props: {
      title: "$slots",
      id: "slots",
    },
    children: slotsSchemas
  }] : []
  const dataTab = {
    componentName: "TabPanel",
    props: {
      title: "$field",
      id: "data",
      style: {
        padding: 0
      },
    },
    children: createFieldSchema(fieldOptions)
  }
  const controllerTab = {
    componentName: "TabPanel",
    props: {
      title: "$logic",
      id: "logic",
    },
    children: createControllerSchema()
  }
  return {
    componentName: "Tabs",
    props: {},
    children: [
      ...propsTab,
      styleTab,
      ...slotsTab,
      dataTab,
      controllerTab,
    ]
  }
}

const styleTab = {
  componentName: "TabPanel",
  props: {
    title: "$style"
  },
  "x-field": {
    type: "object",
    name: "props.style"
  },
  children: [
    {
      componentName: "FormItem",
      props: {
        label: "$width",
      },
      children: [
        {
          componentName: "SizeInput",
          "x-field": {
            name: "width",
            params: {
              withBind: true,
            }
          },
        }
      ]
    },
    {
      componentName: "FormItem",
      props: {
        label: "$height",
      },
      children: [
        {
          componentName: "SizeInput",
          "x-field": {
            name: "height",
            params: {
              withBind: true,
            }
          },
        }
      ]
    },
    displaySetter,
    backgroundSetter,
    fontStyleSetter,
    martinStyleSetter,
    paddingStyleSetter,
    borderRediusSetter,
    borderSetter,
    {
      componentName: "FormItem",
      props: {
        label: "$opacity",
      },
      children: [
        {
          componentName: "Slider",
          "x-field": {
            name: "opacity",
            params: {
              withBind: true,
            }
          },
          props: {
            max: 1,
            step: 0.1,
            defaultValue: 1,
          }
        }
      ]
    },
  ]
}