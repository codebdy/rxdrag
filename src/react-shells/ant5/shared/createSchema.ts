import { INodeSchema } from "core";
import { borderRediusSetter } from "../SettingsForm/schemas/borderRediusSetter";
import { borderSetter } from "../SettingsForm/schemas/borderSetter";
import { displaySetter } from "../SettingsForm/schemas/displaySetter";
import { fontStyleSetter } from "../SettingsForm/schemas/fontStyleSetter";
import { martinStyleSetter } from "../SettingsForm/schemas/martinStyleSetter";
import { paddingStyleSetter } from "../SettingsForm/schemas/paddingStyleSetter";

export function createSchema(propsSchema?: INodeSchema[], slots?: INodeSchema[]): INodeSchema {
  const propsTab = propsSchema ? [{
    componentName: "TabPanel",
    props: {
      title: "$properties"
    },
    children: [
      ...propsSchema || []
    ]
  }] : [];

  const slotsTab = slots ? [{
    componentName: "TabPanel",
    props: {
      title: "$slots",
      id: "slots",
    },
    children: slots
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
      ...slotsTab
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
    {
      componentName: "FormItem",
      props: {
        label: "$background",
      },
      children: [
        {
          componentName: "ColorInput",
          "x-field": {
            name: "backgroundColor",
          },
        }
      ]
    },
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