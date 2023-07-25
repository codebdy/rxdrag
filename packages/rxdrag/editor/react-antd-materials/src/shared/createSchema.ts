import { INodeSchema } from "@rxdrag/schema";
import { createControllerSchema } from "./createControllerSchema";
import { createFieldSchema } from "./createFieldSchema";
import { SchemaOptions } from "./SchemaOptions";
import { attachFormItem } from "./attachFormItem";
import { IFieldMeta } from "@rxdrag/fieldy-schema";
import { ILogicFlowControllerMeta } from "@rxdrag/minions-runtime-react";
import { transPropSchemas } from "./transPropSchemas";

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

export function createSchema(options: SchemaOptions<IFieldMeta, ILogicFlowControllerMeta> = {}): INodeSchema {
  const { propsSchemas, slotsSchemas, fieldOptions: fieldOptions, events } = options
  const propsTab = propsSchemas ? [{
    componentName: "TabPanel",
    props: {
      title: "$properties"
    },
    children: [
      ...transPropSchemas<IFieldMeta, ILogicFlowControllerMeta>(propsSchemas) || []
    ]
  }] : [];

  const slotsTab = slotsSchemas ? [{
    componentName: "TabPanel",
    props: {
      title: "$slots",
      id: "slots",
    },
    children: attachFormItem(slotsSchemas)
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
    children: createControllerSchema(events)
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
  componentName: 'TabPanel',
  props: {
    title: '$style'
  },
  children: [
    {
      componentName: 'StyleSetter',
      'x-field': {
        name: 'props.style',
      }
    }
  ]
};

