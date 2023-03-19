import { Button } from "antd"
import { useToolsTranslate } from "core-react/hooks/useToolsTranslate"
import { memo, useCallback, useEffect, useState } from "react"
import { ColorInput } from "react-shells/ant5/SettingsForm/components/ColorInput"
import styled from "styled-components"
import { PredefinedColorInput } from "./PredefinedColorInput"

const Container = styled.div`
  display: flex;
`

const SwitchButton = styled(Button)`
  margin-left: 2px;
`

const predefinedColors = [
  'magenta',
  'red',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'geekblue',
  'purple',
]

enum ColorType {
  Predefined = "predefined",
  Customized = "customized"
}

export const TagColorInput = memo((props: {
  value?: string,
  onChange?: (value?: string) => void
}) => {
  const { value, onChange } = props
  const [colorType, setColorType] = useState<ColorType>()
  const t = useToolsTranslate()
  useEffect(() => {
    if (predefinedColors.find(color => color === value) || value === undefined) {
      setColorType(ColorType.Predefined)
    } else {
      setColorType(ColorType.Customized)
    }
  }, [value])

  const handleClick = useCallback(() => {
    setColorType(type => type === ColorType.Customized ? ColorType.Predefined : ColorType.Customized)
  }, [])

  return (
    <Container>
      {
        colorType === ColorType.Customized
          ? <ColorInput value={value} onChange={onChange} />
          : <PredefinedColorInput value={value} onChange={onChange} colors={predefinedColors} />
      }

      <SwitchButton onClick={handleClick}>
        {
          t(colorType || "")
        }
      </SwitchButton>
    </Container>
  )
})