export const labelSchema = {
  componentName: "FormItem",
  props:{
    label: "$label",
  },
  "x-field": {
    name: "label",
  },
  children: [
    {
      componentName: "Input",
    }
  ]
}

export const nameSchema = {
  componentName: "FormItem",
  props:{
    label: "$name",
  },
  "x-field": {
    name: "name",
  },
  children: [
    {
      componentName: "Input",
    }
  ]
}
