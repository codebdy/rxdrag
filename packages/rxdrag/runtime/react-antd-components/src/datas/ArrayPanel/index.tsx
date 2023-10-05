import { memo, useEffect } from "react"
import { ObjectField, useField, useFieldValue } from "@rxdrag/react-fieldy"
import { isNum } from "@rxdrag/shared";

export type ArrayPanelProps = {
  dataSource?: unknown[] | number,
  children?: React.ReactNode,
}

export const ArrayPanel = memo((props: ArrayPanelProps) => {
  const { dataSource, children } = props;
  const value = useFieldValue() as unknown[] | undefined
  const field = useField()
  useEffect(() => {
    if (dataSource) {
      if (isNum(dataSource)) {
        field?.setValue(Array.from(Array(dataSource), (value, index) => ({ index, value })))
      } else {
        field?.setValue(dataSource)
      }
    }
  }, [dataSource, field])

  return (
    value?.map((_, index) => {
      return (
        <ObjectField key={index} name={index.toString()}>
          {
            children
          }
        </ObjectField>
      )
    })
  )
})