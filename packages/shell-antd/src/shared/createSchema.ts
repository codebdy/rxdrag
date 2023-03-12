import { INodeSchema } from "core";
import { IBindParams } from "runner/ComponentRender/interfaces";
import { IFieldMeta } from "runner/fieldy";
import { IControllerMeta } from "runner/minions";
import { backgroundSetter } from "../SettingsForm/schemas/backgroundSetter";
import { borderRediusSetter } from "../SettingsForm/schemas/borderRediusSetter";
import { borderSetter } from "../SettingsForm/schemas/borderSetter";
import { displaySetter } from "../SettingsForm/schemas/displaySetter";
import { fontStyleSetter } from "../SettingsForm/schemas/fontStyleSetter";
import { martinStyleSetter } from "../SettingsForm/schemas/martinStyleSetter";
import { paddingStyleSetter } from "../SettingsForm/schemas/paddingStyleSetter";
import { createReactionSchema, LogicOptions } from "./createReactionSchema";

export type SchemaOptions<IField = any, IReactions = any> = {
  propsSchemas?: INodeSchema<IField, IReactions>[],
  slotsSchemas?: INodeSchema<IField, IReactions>[],
  logicOptions?: LogicOptions,
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
  const { propsSchemas, slotsSchemas, logicOptions } = options
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

  const logicTab = [{
    componentName: "TabPanel",
    props: {
      title: "$logic",
      id: "logic",
      style: {
        padding: 0
      },
    },
    children: createReactionSchema(logicOptions)
  }]
  return {
    componentName: "Tabs",
    props: {},
    children: [
      ...propsTab,
      styleTab,
      ...slotsTab,
      ...logicTab
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