import React, { useEffect, useState, memo, useCallback, useRef } from 'react'
import { Button, InputNumber } from 'antd'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex: 1;

  .ant-input-number {
    width: auto;
  }

  .poly-button {
    min-width: 32px;
  }
`

export const takeNumber = (value: any, type: string) => {
  if (value === undefined) {
    return value
  }
  const strValue = String(value)
  if (strValue.length >= type.length) {
    const numStr = strValue.substring(0, strValue.length - type.length)
    return Number(numStr)
  }

  return value
}

export const createUnitType = (type: string): IPolyType => {
  return {
    type,
    component: InputNumber,
    checker(value: any) {
      return String(value).endsWith(type)
    },
    toInputValue: (value: any) => {
      return takeNumber(value, type)
    },
    toChangeValue: (value?: any) => {
      return `${value || 0}${type}`
    },
  }
}

export const createSpecialSizeOption = (type: string): IPolyType => ({
  type: type,
  checker(value: any) {
    if (value === type) return true
    return false
  },
  toChangeValue() {
    return type
  },
})


export interface IPolyType {
  type: string
  title?: string
  icon?: string
  component?: React.FC<any>
  checker: (value: any) => boolean
  toInputValue?: (value: any) => any
  toChangeValue?: (value?: any) => any
}

export type PolyTypes = IPolyType[]

const isValid = (val: any) => val !== undefined && val !== null

const getEventValue = (event: any) => {
  if (event?.target) {
    if (isValid(event.target.value)) return event.target.value
    if (isValid(event.target.checked)) return event.target.checked
    return
  }
  return event
}

export const PolyInput = memo((
  props: {
    polyTypes: PolyTypes,
    value?: string,
    onChange?: (value?: string | null) => void
  }
) => {
  const { polyTypes, value, onChange } = props;
  const [polyType, setPolyType] = useState<IPolyType>();
  const [index, setIndex] = useState(0)
  const indexRef = useRef(index)
  indexRef.current = index
  const changeRef = useRef<(value?: string | null) => void>()
  changeRef.current = onChange
  useEffect(() => {
    const polyTp = polyTypes?.[index]
    setPolyType(polyTp)
  }, [index, polyType, polyTypes])

  const handleClick = useCallback(() => {
    let newIndex = 0
    if (indexRef.current === polyTypes.length - 1) {
      setIndex(newIndex)
    } else {
      newIndex = indexRef.current + 1
      setIndex((index) => newIndex)
    }
    changeRef.current?.(polyTypes?.[newIndex].toChangeValue?.())
  }, [polyTypes])

  const InputComponent = polyType?.component

  const handleInputChange = useCallback((e: any) => {
    const newValue = getEventValue(e)
    if (newValue) {
      onChange?.(polyType?.toChangeValue?.(newValue))
    } else {
      onChange?.(undefined)
    }

  }, [onChange, polyType])

  return (
    <Container>
      {
        InputComponent &&
        <InputComponent value={polyType?.toInputValue?.(value)} onChange={handleInputChange} />
      }
      <Button
        className='poly-button'
        style={{
          marginLeft: InputComponent ? 1 : undefined
        }}
        block={!InputComponent}
        icon={<>{polyType?.title || polyType?.icon || polyType?.type}</>}
        onClick={handleClick}>
      </Button>
    </Container>
  )
})