import { memo } from "react"
import styled from "styled-components"
import { Toolbar } from "./Toolbar"
import { Button } from "antd"
import { useTranslate } from "@rxdrag/react-locales"
import { useQueryExtensionScript } from "../../hooks/useQueryExtensionScript"
import { ID } from "@rxdrag/shared"

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column;
`

export const ScriptEditor = memo((
  props: {
    id?: ID,
  }
) => {
  const { id } = props
  const t = useTranslate()
  const { script } = useQueryExtensionScript(id)

  return (
    <Container
      className="script-editor"
      style={{ display: id ? undefined : "none" }}
    >
      <Toolbar>
        <span>
          {script?.name}
        </span>
        <Button type="primary">
          {
            t("Save")
          }
        </Button>
      </Toolbar>
    </Container>
  )
})