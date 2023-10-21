export const labelSchema = {
  componentName: "FormItem",
  props:{
    label: "$label",
  },
  "x-data": {
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
  "x-data": {
    name: "name",
  },
  children: [
    {
      componentName: "Input",
    }
  ]
}
