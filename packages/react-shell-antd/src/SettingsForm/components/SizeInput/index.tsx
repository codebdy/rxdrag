import { isArr, isStr } from '@rxdrag/shared'
import React from 'react'
import { memo, useMemo } from 'react'
import { FoldExtraItem } from '../Fold/FoldExtraItem'
import { createSpecialSizeOption, createUnitType, PolyInput } from '../PolyInput'


const NormalSizeOptions = [
  createSpecialSizeOption('inherit'),
  createSpecialSizeOption('auto'),
  createUnitType('px'),
  createUnitType('%'),
  createUnitType('vh'),
  createUnitType('em'),
]

export const SizeInput = memo((props: {
  exclude?: string[] | string,
  value?: string,
  onChange?: (value?: string | null) => void
}) => {
  const { exclude, value, onChange } = props

  const options = useMemo(() => {
    if (isStr(exclude)) {
      return NormalSizeOptions.filter(op => op.type !== exclude)
    }

    if (isArr(exclude)) {
      return NormalSizeOptions.filter(op => !exclude.find(ex => ex === op.type))
    }

    return NormalSizeOptions
  }, [exclude])

  return (
    <PolyInput polyTypes={options} value={value} onChange={onChange} />
  )
})

export const SizeInputItem = memo((props: {
  title?: string,
  span?: number,
  value?: string,
  icon?: string,
  marginTop?: number,
  onChange?: (value?: string | null) => void
}) => {
  const { title, span = 12, value, icon, marginTop, onChange } = props
  return (
    <FoldExtraItem span={span}
      title={title}
      icon={icon}
      marginTop={marginTop}
    >
      <SizeInput exclude={["inherit", "auto"]} value={value} onChange={onChange} />
    </FoldExtraItem>
  )
})