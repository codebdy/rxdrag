import { INodeSchema } from "@rxdrag/schema";
import { createControllerSchema } from "./createControllerSchema";
import { createFieldSchema } from "./createFieldSchema";
import { SchemaOptions } from "./SchemaOptions";
import { transPropSchemas } from "./transPropSchemas";
import { transSlotSchemas } from "./transSlotSchemas";

export function createSchema(options: SchemaOptions = {}): INodeSchema {
  const { propSchemas, slotSchemas, fieldOptions: fieldOptions, events } = options
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
  const dataTab = fieldOptions?.canBindField ? [
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
      ...dataTab,
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

