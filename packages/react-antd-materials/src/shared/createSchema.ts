import { IBindParams } from "@rxdrag/react-runner";
import { IControllerMeta, IFieldMeta, INodeSchema } from "@rxdrag/schema";
import { createControllerSchema } from "./createControllerSchema";
import { displaySetter, backgroundSetter, fontStyleSetter, martinStyleSetter, paddingStyleSetter, borderRediusSetter, borderSetter } from "./schemas";
import { FieldOptions, createFieldSchema } from "./createFieldSchema";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SchemaOptions<IField = any, IReactions = any> = {
  propsSchemas?: INodeSchema<IField, IReactions>[],
  slotsSchemas?: INodeSchema<IField, IReactions>[],
  logicOptions?: FieldOptions,
}

export function attachFormItem(schemas?: INodeSchema<IFieldMeta<IBindParams>, IControllerMeta>[]): INodeSchema<IFieldMeta<IBindParams>, IControllerMeta>[] | undefined {
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
  }))
}

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

export function withFormItem(options: SchemaOptions = {}) {
  return {
    ...options,
    propsSchemas: attachFormItem(options.propsSchemas),
    slotsSchemas: attachFormItem(options.slotsSchemas),
  }
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