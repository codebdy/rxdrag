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
        params: {
          withBind: true,
        }
      },
    }
  ]
}
