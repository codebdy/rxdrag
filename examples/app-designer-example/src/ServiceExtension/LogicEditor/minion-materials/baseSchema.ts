export const labelSchema = {
  componentName: "FormItem",
  props: {
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
  props: {
    label: "$name",
  },
  children: [
    {
      componentName: "Input",
      "x-data": {
        name: "name",
        params: {
          withBind: true,
        }
      },
    }
  ]
}
