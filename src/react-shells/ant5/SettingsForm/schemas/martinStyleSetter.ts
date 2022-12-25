import { INodeSchema } from "core";
import { IFieldMeta } from "fieldy";

export const martinStyleSetter: INodeSchema<IFieldMeta> = {
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
            effects: {
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
              onMultiFieldValueChange: {
                fields: ['$siblings.marginTop', '$siblings.marginRight', '$siblings.marginBottom', '$siblings.marginLeft'],
                jsCode: `
                  $self.setValue('')
                `
              }
            },
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
            effects: {
              onFieldValueChange: {
                field: '$siblings.margin',
                jsCode: `
                  $siblings.margin && $self.setValue($siblings.margin)
                `
              }
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
            effects: {
              onFieldValueChange: {
                field: '$siblings.margin',
                jsCode: `
                $siblings.margin && $self.setValue($siblings.margin)
              `
              },
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
            effects: {
              onFieldValueChange: {
                field: '$siblings.margin',
                jsCode: `
                  $siblings.margin && $self.setValue($siblings.margin)
                `
              }
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
            effects: {
              onFieldValueChange: {
                field: '$siblings.margin',
                jsCode: `
                  $siblings.margin && $self.setValue($siblings.margin)
                `
              }
            }
          }
        },
      ]
    }
  ]
}