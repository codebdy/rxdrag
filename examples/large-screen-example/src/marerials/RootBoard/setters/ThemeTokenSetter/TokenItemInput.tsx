/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColorInput } from "@rxdrag/react-antd-props-inputs"
import { useSettersTranslate } from "@rxdrag/react-core"
import { GlobalToken } from "antd"
import { memo, useCallback } from "react"
import styled from "styled-components"

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
`


const ColorItem = styled.div`
  display: flex;
  align-items: center;
`

const ColorLabel = styled.div`
  width: 100px;
`

export const TokenItemInput = memo((
  props: {
    name: string,
    value?: GlobalToken,
    onChange?: (value?: GlobalToken) => void
  }
) => {
  const { name, value, onChange } = props;
  const t = useSettersTranslate()

  const handleChange = useCallback((color?: string) => {
    onChange?.({ ...value, [name]: color } as any)
  }, [name, onChange, value])

  return (
    <Container>
      <ColorItem>
        <ColorLabel>
          {t(name)}
        </ColorLabel>
        <ColorInput value={(value as any)?.[name]} onChange={handleChange} />
      </ColorItem>
    </Container>
  )
})