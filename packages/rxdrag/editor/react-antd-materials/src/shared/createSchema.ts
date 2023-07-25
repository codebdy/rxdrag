import { INodeSchema } from "@rxdrag/schema";
import { createControllerSchema } from "./createControllerSchema";
import { createFieldSchema } from "./createFieldSchema";
import { SchemaOptions } from "./SchemaOptions";
import { transPropSchemas } from "./transPropSchemas";
import { transSlotSchemas } from "./transSlotSchemas";

export function createSchema(options: SchemaOptions = {}): INodeSchema {
  const { propSchemas: props, slotSchemas: slots, fieldOptions: fieldOptions, events } = options
  const propsTab = props ? [{
    componentName: "TabPanel",
    props: {
      title: "$properties"
    },
    children: [
      ...transPropSchemas(props) || []
    ]
  }] : [];

  const slotsTab = slots ? [{
    componentName: "TabPanel",
    props: {
      title: "$slots",
      id: "slots",
    },
    children: transSlotSchemas(slots)
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

