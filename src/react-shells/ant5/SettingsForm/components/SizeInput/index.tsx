import { memo } from 'react'
import { createSpecialSizeOption, createUnitType, PolyInput } from '../PolyInput'


const NormalSizeOptions = [
  createSpecialSizeOption('inherit'),
  createSpecialSizeOption('auto'),
  createUnitType('px'),
  createUnitType('%'),
  createUnitType('vh'),
  createUnitType('em'),
]

export const SizeInput = memo(() => {
  return (
    <PolyInput polyTypes = {NormalSizeOptions} />
  )
})

