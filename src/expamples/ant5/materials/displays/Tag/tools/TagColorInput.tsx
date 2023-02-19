import { Button } from "antd"
import { useToolsTranslate } from "core-react/hooks/useToolsTranslate"
import { memo } from "react"
import { ColorInput } from "react-shells/ant5/SettingsForm/components/ColorInput"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
`

export const TagColorInput = memo((props: {
  value?: string,
  onChange?: (value?: string) => void
}) => {
  const { value, onChange } = props
  const t = useToolsTranslate()
  return (
    <Container>
      <ColorInput />
      <Button>
        {t("predefined")}
      </Button>
    </Container>
  )
})