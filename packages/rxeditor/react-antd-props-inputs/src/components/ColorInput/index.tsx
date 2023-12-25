import React, { useRef } from 'react'
import { Input, Popover } from 'antd'
import { ColorResult, SketchPicker } from 'react-color'
import { useToken } from 'antd/es/theme/internal'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  .color-tips {
    width: 20px;
    height: 20px;
    border-radius: 2px;
    cursor: pointer;
  }
`
export interface IColorInputProps {
  value?: string
  onChange?: (color: string) => void
}

export const ColorInput: React.FC<IColorInputProps> = (props) => {
  const container = useRef<HTMLDivElement>(null)
  const color = props.value as string
  const [, token] = useToken()
  return (
    <Container ref={container}>
      <Input
        value={props.value}
        onChange={(e) => {
          props.onChange?.(e.target.value)
        }}
        placeholder="Color"
        allowClear
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
              className={'color-tips'}
              style={{
                backgroundColor: color,
                border:`${token?.colorBorder} solid 1px`
              }}
            ></div>
          </Popover>
        }
      />
    </Container>
  )
}
