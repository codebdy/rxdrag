import { IFieldMeta } from "fieldy/interfaces"
import { memo } from "react"

export const FieldFragment = memo((
  props: {
    fieldMeta: IFieldMeta,
    children?: React.ReactNode
  }
)=>{
  const { fieldMeta, children } = props
  return (
    <>
    {children}
    </>
  )
})