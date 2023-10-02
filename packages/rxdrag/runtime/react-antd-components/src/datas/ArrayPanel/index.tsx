import { memo, useEffect } from "react"
import { Field, useField, useFieldValue } from "@rxdrag/react-fieldy"
import { isNum } from "@rxdrag/shared";

export type ArrayPanelProps = {
  datasource?: unknown[] | number,
  children?: React.ReactNode,
}

export const ArrayPanel = memo((props: ArrayPanelProps) => {
  const { datasource, children } = props;
  const value = useFieldValue() as unknown[] | undefined
  const field = useField()

  useEffect(()=>{
    if(datasource){
      if(isNum(datasource)){
        field?.setValue(Array.from(Array(datasource),(_, index) => index))
      }else{
        field?.setValue(datasource)
      }
    }
  },[datasource, field])

  return (
    <>
      {
        value?.map((_, index) => {
          return (
            <Field key={index} name={index.toString()}>
              <Field name="index" value={index} />
              {
                children
              }
            </Field>
          )
        })
      }
    </>
  )
})