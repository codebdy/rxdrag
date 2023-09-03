import { INodeSchema } from "@rxdrag/schema";
import { createFieldSchema } from "./createFieldSchema";
import { SchemaOptions } from "./SchemaOptions";
import { transPropSchemas } from "./transPropSchemas";
import { transSlotSchemas } from "./transSlotSchemas";

export function createSchema(options: SchemaOptions = {}): INodeSchema {
  const { propSchemas, slotSchemas, canBindField } = options
  const propsTab = propSchemas ? [{
    componentName: "TabPanel",
    props: {
      title: "$properties"
    },
    children: [
      ...transPropSchemas(propSchemas) || []
    ]
  }] : [];

  const slotsTab = slotSchemas ? [{
    componentName: "TabPanel",
    props: {
      title: "$slots",
      id: "slots",
    },
    children: transSlotSchemas(slotSchemas)
  }] : []
  const fieldTab = canBindField ? [
    {
      componentName: "TabPanel",
      props: {
        title: "$field",
        id: "data",
        style: {
          padding: 0,
        }
      },
      children: createFieldSchema()
    }] : []
  return {
    componentName: "Tabs",
    props: {},
    children: [
      ...propsTab,
      styleTab,
      ...slotsTab,
      ...fieldTab,
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

