import React, { useCallback, useRef, useState } from 'react'
import { Input, Popover, Space, Tag } from 'antd'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  .color-tips {
    cursor: pointer;
  }
`
const StyledSpace = styled(Space)`
  width: 248px;
  padding: 8px;
`
const ColorCell = styled(Tag)`
  width: 64px;
  height: 28px;
  border: ${props => props.theme.token?.colorBorder} solid 1px;
  cursor: pointer;
`

export interface IColorInputProps {
  value?: string
  onChange?: (color: string) => void,
  colors: string[]
}


export const PredefinedColorInput: React.FC<IColorInputProps> = (props) => {
  const { colors, onChange, value, ...other } = props
  const [open, setOpen] = useState(false)
  const container = useRef<HTMLDivElement>(null)

  const handleCellClick = useCallback((color: string) => {
    onChange?.(color)
    setOpen(false)
  }, [onChange])

  const handleOpenChange = useCallback((open: boolean) => {
    setOpen(open)
  }, [])

  return (
    <Container ref={container} {...other}>
      <Input
        readOnly
        onChange={(e) => {
          onChange?.(e.target.value)
        }}
        prefix={
          <Popover
            autoAdjustOverflow
            trigger="click"
            overlayInnerStyle={{ padding: 0 }}
            placement="bottom"
            open={open}
            onOpenChange={handleOpenChange}
            content={
              <StyledSpace wrap align='center'>
                {
                  colors.map((color => {
                    return (
                      <ColorCell key={color} color={color} onClick={() => handleCellClick(color)}>
                        {color}
                      </ColorCell>
                    )
                  }))
                }
              </StyledSpace>
            }
          >
            <Tag
              color={value}
              className = "color-tips"
            >{value || "color"}</Tag>
          </Popover>
        }
      />
    </Container>
  )
}
