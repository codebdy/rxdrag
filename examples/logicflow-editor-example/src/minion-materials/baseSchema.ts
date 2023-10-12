export const labelSchema = {
  componentName: "FormItem",
  props: {
    label: "$label",
  },
  children: [
    {
      componentName: "Input",
      "x-field": {
        name: "label",
      },
    }
  ]
}

export const nameSchema = {
  componentName: "FormItem",
  props: {
    label: "$name",
  },
  children: [
    {
      componentName: "Input",
      "x-field": {
        name: "name",
      },
    }
  ]
}
