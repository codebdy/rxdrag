import { Col, Tooltip } from "antd"
import React, { CSSProperties, forwardRef, memo } from "react"
import cls from "classnames"
import { isStr } from "@rxdrag/shared"

export type ValueIconProps = {
  icon?: React.ReactNode | string
}

export const ValueIcon = memo(forwardRef<HTMLDivElement, ValueIconProps>((props, ref) => {
  return (
    <FoldIcon ref={ref} className="rx-value-icon" icon={props.icon} />
  )
}))

export type IconViewProps = {
  style?: CSSProperties,
  className?: string,
  icon?: React.ReactNode | string
}

export const FoldIcon = memo(forwardRef<HTMLDivElement, IconViewProps & { onClick?: () => void }>((props, ref) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { icon, ...other } = props
  return (
    isStr(props.icon)
      ? <div ref={ref} {...other} dangerouslySetInnerHTML={{ __html: props.icon || "" }}>
      </div>
      : <div ref={ref} {...other} >
        {props.icon}
      </div>
  )
}))

export const FoldExtraItem = memo((props: {
  title?: string,
  icon?: React.ReactNode | string,
  span?: number,
  marginTop?: number,
  className?: string,
  style?: CSSProperties,
  children?: React.ReactNode
}) => {
  const { title, icon, span = 12, marginTop, className, children, style, ...other } = props

  return (
    <Col
      span={span}
      className={cls("value-column", className)}
      style={{ marginTop: marginTop, ...style }}
      {...other}
    >
      {
        icon &&
        <Tooltip title={title}>
          <span>
            <ValueIcon icon={icon} />
          </span>
        </Tooltip>
      }

      {children}
    </Col>
  )
})