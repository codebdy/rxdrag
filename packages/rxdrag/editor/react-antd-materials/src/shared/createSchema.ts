import { INodeSchema } from "@rxdrag/schema";
import { createFieldSchema } from "./createFieldSchema";
import { SchemaOptions } from "./SchemaOptions";
import { transPropSchemas } from "./transPropSchemas";
import { transSlotSchemas } from "./transSlotSchemas";

export function createSchema(options: SchemaOptions = {}): INodeSchema {
  const { propSchemas, slotSchemas, canBindField } = options

  const propsCollapse = propSchemas ? [{
    componentName: "CollapsePanel",
    props: {
      title: "$basic",
      defaultExpand: true,
    },
    children: [
      ...transPropSchemas(propSchemas) || []
    ]
  }] : []

  const slotCollapse = slotSchemas ? [{
    componentName: "CollapsePanel",
    props: {
      title: "$slots",
    },
    children: [
      ...transSlotSchemas(slotSchemas) || []
    ]
  }] : []

  const controllerCollapse = {
    componentName: "CollapsePanel",
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
  }

  const propsTab = propSchemas ? [{
    componentName: "TabPanel",
    props: {
      title: "$properties",
      style: {
        padding: 0,
      }
    },
    children: [...propsCollapse, ...slotCollapse, controllerCollapse]
  }] : [];


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

