import { INodeSchema } from "core";
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

export function createSchema(opetions: SchemaOptions = {}): INodeSchema {
  const { propsSchemas, slotsSchemas, logicOptions } = opetions
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