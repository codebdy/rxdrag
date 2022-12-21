import { isArr, isStr } from 'core/utils/types'
import { memo, useMemo } from 'react'
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

  const options = useMemo(()=>{
    if(isStr(exclude)){
      return NormalSizeOptions.filter(op=>op.type !== exclude)
    }

    if(isArr(exclude)){
      return NormalSizeOptions.filter(op=>!exclude.find(ex=>ex === op.type))
    }

    return NormalSizeOptions
  }, [exclude])
  
  return (
    <PolyInput polyTypes={options} value= {value} onChange ={onChange}/>
  )
})

