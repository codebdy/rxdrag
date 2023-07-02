import React from "react"
import { Form } from "antd";
import { forwardRef, memo } from "react";
import { useFieldPath } from "@rxdrag/react-fieldy";
import { useComponentSchema, ComponentView, usePreviewComponents } from "@rxdrag/react-runner";

export const FormItem = memo(forwardRef<HTMLDivElement>((
  props: {
    children?: React.ReactNode
  },
  ref
) => {
  const { children, ...other } = props
  const path = useFieldPath()
  const { components } = usePreviewComponents()
  const componentSchema = useComponentSchema()
  const child = componentSchema?.children?.[0]
  const componentName = child?.componentName
  const Component = componentName ? components[componentName] : componentName as any
  if (componentSchema?.children?.length && componentSchema?.children?.length > 1) {
    console.error("FormItem can only have one child")
  }
  return (
    <Form.Item
      name={path}
      {...other}
    >
      {
        child &&
        <Component {...child.props} key={child.id}>
          {
            child.children?.map((subChild) => {
              return <ComponentView key={subChild.id} node={subChild} />
            })
          }
        </Component>
      }

    </Form.Item>
  )
}))