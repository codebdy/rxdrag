import { INodeSchema } from "core";

export const martinStyleSetter: INodeSchema = {
  componentName: "Fold",
  "x-field": {
    type: "object",
    name: "style"
  },
  children: [
    {
      componentName: "FoldBase",
      props: {
        label: "$margin",
      },
      children: [
        {
          componentName: "MarginInput",
          "x-field": {
            name: "margin",
            virtual: true,
            onInit: `
              if($siblings.marginTop === siblings.marginRight && 
                siblings.marginRight === $siblings.marginBottom &&
                $siblings.marginBottom === $siblings.marginLeft
                ){
                  $self.setValue($siblings.marginTop)
              }else{
                $self.setValue('')
              }
            `,
            onFieldsValueChange: {
              fields: ['$siblings.marginTop', '$siblings.marginRight', '$siblings.marginBottom', '$siblings.marginLeft'],
              jsCode: `
                $self.setValue('')
              `
            }
          },
        }
      ]
    },
    {
      componentName: "FoldExtra",
      children: [
        {
          componentName: "MarginTopInput",
          props: {
            title: "$marginTop",
          },
          "x-field": {
            name: "marginTop",
            onFieldsValueChange: {
              fields: ['$siblings.margin'],
              jsCode: `
                $siblings.margin && $self.setValue($siblings.margin)
              `
            }
          }
        },
        {
          componentName: "MarginRightInput",
          props: {
            title: "$marginRight",
          },
          "x-field": {
            name: "marginRight",
            onFieldsValueChange: {
              fields: ['$siblings.margin'],
              jsCode: `
                $siblings.margin && $self.setValue($siblings.margin)
              `
            }
          }
        },
        {
          componentName: "MarginLeftInput",
          props: {
            title: "$marginLeft",
          },
          "x-field": {
            name: "marginLeft",
            onFieldsValueChange: {
              fields: ['$siblings.margin'],
              jsCode: `
                $siblings.margin && $self.setValue($siblings.margin)
              `
            }
          }
        },
        {
          componentName: "MarginBottomInput",
          props: {
            title: "$marginBottom",
          },
          "x-field": {
            name: "marginBottom",
            onFieldsValueChange: {
              fields: ['$siblings.margin'],
              jsCode: `
                $siblings.margin && $self.setValue($siblings.margin)
              `
            }
          }
        },
      ]
    }
  ]
}