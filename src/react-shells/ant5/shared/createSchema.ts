import { INodeSchema } from "core";
import { backgroundSetter } from "../SettingsForm/schemas/backgroundSetter";
import { borderRediusSetter } from "../SettingsForm/schemas/borderRediusSetter";
import { borderSetter } from "../SettingsForm/schemas/borderSetter";
import { displaySetter } from "../SettingsForm/schemas/displaySetter";
import { fontStyleSetter } from "../SettingsForm/schemas/fontStyleSetter";
import { martinStyleSetter } from "../SettingsForm/schemas/martinStyleSetter";
import { paddingStyleSetter } from "../SettingsForm/schemas/paddingStyleSetter";

export type SchemaOptions = {
  propsSchemas?: INodeSchema[],
  slotsSchemas?: INodeSchema[],
  dataSchemas?: INodeSchema[],
}

export function createSchema(opetions: SchemaOptions = {}): INodeSchema {
  const { propsSchemas, slotsSchemas, dataSchemas } = opetions
  const propsTab = propsSchemas ? [{
    componentName: "TabPanel",
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

  const dataTab = slotsSchemas ? [{
    componentName: "TabPanel",
    props: {
      title: "$data",
      id: "data",
    },
    children: dataSchemas
  }] : []
  return {
    componentName: "Tabs",
    props: {},
    "x-field": {
      type: "object",
      name: "props",
    },
    children: [
      ...propsTab,
      styleTab,
      ...slotsTab,
      ...dataTab
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
    name: "style"
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