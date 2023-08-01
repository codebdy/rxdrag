/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button, Input, InputNumber, Switch } from "antd";
import { useSettersTranslate } from "@rxdrag/react-core";
import { isBool, isNum, isStr } from "@rxdrag/shared";
import { memo, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { JSONInput } from "../JSONInput";

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex: 1;

  .ant-input-number {
    width: auto;
  }

  .input-button {
    min-width: 80px;
    margin-left: 2px;
  }
`

const InputCol = styled.div`
  flex: 1;
`

export enum ValueType {
  Boolean = "boolean",
  Number = "number",
  String = "string",
  JSON = "JSON",
}

const types = [
  ValueType.String,
  ValueType.Number,
  ValueType.Boolean,
  ValueType.JSON,
]

function getValueType(value?: any) {
  if (isStr(value)) {
    return ValueType.String
  }
  if (isBool(value)) {
    return ValueType.Boolean
  }
  if (isNum(value)) {
    return ValueType.Number
  }
  return ValueType.JSON
}

export const ValueInput = memo((
  props: {
    value?: any,
    onChange?: (value?: any) => void,
  }
) => {
  const { value, onChange } = props
  const [typeIndex, setTypeIndex] = useState(0)
  const t = useSettersTranslate()

  useEffect(() => {
    if (value === undefined) {
      setTypeIndex(0)
    } else {
      const newIndex = types.indexOf(getValueType(value))
      setTypeIndex(newIndex)
    }

  }, [value])

  const handleClick = useCallback(() => {
    let newIndex = typeIndex + 1

    if (newIndex >= types.length) {
      newIndex = 0
    }
    setTypeIndex(newIndex)
    if (types[newIndex] === ValueType.String) {
      onChange?.(value?.toString())
    } else if (types[newIndex] === ValueType.Boolean) {
      onChange?.(!!value)
    } else if (types[newIndex] === ValueType.Number) {
      onChange?.(0)
    } else if (types[newIndex] === ValueType.JSON) {
      onChange?.(null)
    }
  }, [onChange, typeIndex, value])

  const handleStringChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    onChange?.(event.target?.value)
  }, [onChange])

  const handleNumberChange = useCallback((newValue?: number | null) => {
    onChange?.(newValue || undefined)
  }, [onChange])

  const handleBooleanChange = useCallback((checked: boolean) => {
    onChange?.(checked)
  }, [onChange])

  const handleJSONChange = useCallback((json: any) => {
    onChange?.(json)
  }, [onChange])


  return (<Container>
    <InputCol>
      {
        types[typeIndex] === ValueType.String &&
        <Input value={value} onChange={handleStringChange} />
      }
      {
        types[typeIndex] === ValueType.Number &&
        <InputNumber value={value as number | undefined} onChange={handleNumberChange} />
      }
      {
        types[typeIndex] === ValueType.Boolean &&
        <Switch checked={value} onChange={handleBooleanChange} />
      }
      {
        types[typeIndex] === ValueType.JSON &&
        <JSONInput title={t("editJson")} value = {value} onChange = {handleJSONChange} />
      }
    </InputCol>
    <Button
      className='input-button'
      onClick={handleClick}>
      {t(types[typeIndex])}
    </Button>
  </Container>)
})