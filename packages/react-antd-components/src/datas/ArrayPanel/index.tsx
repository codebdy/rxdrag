import { memo, useEffect } from "react"
import { ObjectField, useField, useFieldValue } from "@rxdrag/react-fieldy"
import { isNum } from "@rxdrag/shared";
import { LogicflowRuntime, useArraySchema } from "@rxdrag/react-runner";

export type ArrayPanelProps = {
  dataSource?: unknown[] | number,
  children?: React.ReactNode,
  rowKey?: string,
}

export const ArrayPanel = memo((props: ArrayPanelProps) => {
  const { rowKey = "id", dataSource, children } = props;
  const value = useFieldValue() as unknown[] | undefined
  const field = useField()
  const { schema, childrenSchema } = useArraySchema()

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
    value?.map((val, index) => {
      return (
        schema
          ? <LogicflowRuntime
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            key={(val as any)?.[rowKey] || index}
            ownerId={schema?.["x-controller"]?.id}
            schema={childrenSchema}
            scropeIndex={index}
            scropeValue={val}
          >
            <ObjectField name={index.toString()}>
              {
                children
              }
            </ObjectField>
          </LogicflowRuntime>
          : <></>
      )
    })
  )
})