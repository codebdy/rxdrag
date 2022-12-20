import React, { useEffect, useState, memo, useCallback, useRef } from 'react'
import { Button, InputNumber } from 'antd'
import cls from 'classnames'
import './styles.less'

export const takeNumber = (value: any) => {
  const num = String(value)
    .trim()
    .replace(/[^\d\.]+/, '')
  if (num === '') return
  return Number(num)
}

export const createUnitType = (type: string): IPolyType => {
  return {
    type,
    component: InputNumber,
    checker(value: any) {
      return String(value).endsWith(type)
    },
    toInputValue(value: any) {
      return takeNumber(value)
    },
    toChangeValue(value: any) {
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
  toChangeValue?: (value: any) => any
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
    onChange?: (value?: string) => void
  }
) => {
  const { polyTypes, value, onChange } = props;
  const [polyType, setPolyType] = useState<IPolyType>();
  const [index, setIndex] = useState(0)
  const indexRef = useRef(index)
  indexRef.current = index

  useEffect(() => {
    setPolyType(polyTypes?.[index])
  }, [index, polyTypes])

  const handleClick = useCallback(() => {
    if (indexRef.current === polyTypes.length - 1) {
      setIndex(0)
    } else {
      setIndex((index) => index + 1)
    }
  }, [polyTypes.length])

  const InputComponent = polyType?.component

  return (
    <div className='rx-poly-input'>
      {
        InputComponent &&
        <InputComponent />
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
    </div>
  )
})