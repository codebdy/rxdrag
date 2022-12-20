import { RightOutlined } from "@ant-design/icons"
import { Form } from "antd"
import React, { memo } from "react"
import { CSSProperties } from "styled-components"
import "./style.less"

export type FoldItemProps = {
  children?: React.ReactNode
}

export const FoldItem = memo((props: FoldItemProps) => {
  return (
    <div className='rx-fold-item'>
      {props.children}
    </div>
  )
})

export type FoldBaseItemProps = {
  label?: string,
  children?: React.ReactNode
}
export const FoldBaseItem = memo((props: FoldBaseItemProps) => {
  const { label, children, } = props
  return (
    <Form.Item
      label={
        <div className="rx-fold-base-item">
          <RightOutlined className="base-icon" />{label}
        </div>
      }
    >
      {children}
    </Form.Item>
  )
})

export type FoldExtraItemProps = {
  className?: string,
  style?: CSSProperties,
  children?: React.ReactNode
}


export const FoldExtraItem = memo((props: FoldExtraItemProps) => {
  const { children, ...other } = props;
  return (
    <div {...other}>
      {children}
    </div>
  )
})