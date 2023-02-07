import { Button, Input } from "antd";
import { useToolsTranslate } from "core-react/hooks/useToolsTranslate";
import { memo, useCallback, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex: 1;

  .ant-input-number {
    width: auto;
  }

  .input-button {
    min-width: 96px;
    margin-left: 2px;
  }
`

export enum ValueType {
  Boolean = "boolean",
  Number = "number",
  String = "string"
}

const types = [
  ValueType.String,
  ValueType.Number,
  ValueType.Boolean,
]

export const ValueInput = memo((
  props: {
    defaultType?: ValueType
    value?: any,
    onChange?: (value?: any) => void
  }
) => {
  const {defaultType = ValueType.String, value, onChange} = props
  const [typeIndex, setTypeIndex] = useState(types.indexOf(defaultType))
  const t = useToolsTranslate()

  const handleClick = useCallback(() => {
    const newIndex = typeIndex + 1
    if(newIndex < types.length){
      setTypeIndex(newIndex)
    } else{
      setTypeIndex(0)
    }
  }, [setTypeIndex, typeIndex])

  return (<Container>
    {
      types[typeIndex] === ValueType.String &&
      <Input />
    }
    <Button
      className='input-button'
      onClick={handleClick}>
        {t(types[typeIndex])}
    </Button>
  </Container>)
})