import React, { useRef } from 'react'
import { Input, Popover } from 'antd'
import { ColorResult, SketchPicker } from 'react-color'
import './styles.less'
import { useToken } from 'antd/es/theme/internal'

export interface IColorInputProps {
  value?: string
  onChange?: (color: string) => void
}

export const ColorInput: React.FC<IColorInputProps> = (props) => {
  const container = useRef<HTMLDivElement>(null)
  const prefix = 'rx-color-input'
  const color = props.value as string
  const [, token] = useToken()
  return (
    <div ref={container} className={prefix}>
      <Input
        value={props.value}
        onChange={(e) => {
          props.onChange?.(e.target.value)
        }}
        placeholder="Color"
        prefix={
          <Popover
            autoAdjustOverflow
            trigger="click"
            overlayInnerStyle={{ padding: 0 }}
            content={
              <SketchPicker
                color={color}
                onChange={(colorResult: ColorResult) => {
                  props.onChange?.(`rgba(${colorResult.rgb.r},${colorResult.rgb.g},${colorResult.rgb.b},${colorResult.rgb.a})`)
                }}
              />
            }
          >
            <div
              className={prefix + '-color-tips'}
              style={{
                backgroundColor: color,
                border:`${token.colorBorder} solid 1px`
              }}
            ></div>
          </Popover>
        }
      />
    </div>
  )
}
