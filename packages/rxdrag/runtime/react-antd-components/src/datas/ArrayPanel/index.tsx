import { memo, useEffect } from "react"
import { ObjectField, useField, useFieldValue } from "@rxdrag/react-fieldy"
import { isNum } from "@rxdrag/shared";

export type ArrayPanelProps = {
  datasource?: unknown[] | number,
  children?: React.ReactNode,
}

export const ArrayPanel = memo((props: ArrayPanelProps) => {
  const { datasource, children } = props;
  const value = useFieldValue() as unknown[] | undefined
  const field = useField()

  useEffect(() => {
    if (datasource) {
      if (isNum(datasource)) {
        field?.setValue(Array.from(Array(datasource), (value, index) => ({ index, value })))
      } else {
        field?.setValue(datasource)
      }
    }
  }, [datasource, field])

  return (
    <>
      {
        value?.map((_, index) => {
          return (
            <ObjectField key={index} name={index.toString()}>
              {
                children
              }
            </ObjectField>
          )
        })
      }
    </>
  )
})