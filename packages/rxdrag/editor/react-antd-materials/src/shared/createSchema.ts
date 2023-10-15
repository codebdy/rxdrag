import { INodeSchema } from "@rxdrag/schema";
import { createFieldSchema } from "./createFieldSchema";
import { SchemaOptions } from "./SchemaOptions";
import { transPropSchemas } from "./transPropSchemas";
import { transSlotSchemas } from "./transSlotSchemas";

export function createSchema(options: SchemaOptions = {}): INodeSchema {
  const { propSchemas, slotSchemas, canBindField } = options

  const propsSchemaBlock = propSchemas ? transPropSchemas(propSchemas) : []

  const slotSchemaBlock = slotSchemas ? transSlotSchemas(slotSchemas) : []

  const propsTab = propsSchemaBlock.length || slotSchemaBlock.length
    ? [{
      componentName: "TabPanel",
      props: {
        title: "$properties",
      },
      children: [...propsSchemaBlock, ...slotSchemaBlock]
    }]
    : [];

  const reactionTab = [{
    componentName: "TabPanel",
    props: {
      title: "$reaction",
    },
    children: [
      {
        componentName: "ControllerSetter",
        "x-field": {
          name: "x-controller",
        },
      }
    ]
  }];


  const fieldTab = canBindField ? [
    {
      componentName: "TabPanel",
      props: {
        title: "$field",
        id: "data",
      },
      children: createFieldSchema()
    }] : []

  return {
    componentName: "Tabs",
    props: {},
    children: [
      ...propsTab,
      styleTab,
      ...fieldTab,
      ...reactionTab
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

