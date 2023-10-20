import { ID } from "@rxdrag/shared"
import { memo, useCallback } from "react"
import styled from "styled-components"
import { Toolbar } from "../components/Toolbar"
import { useQueryProcess } from "../hooks/useQueryProcess"
import { useTranslate } from "@rxdrag/react-locales"
import { Button } from "antd"
import { useSaveProcess } from "../hooks/useSaveProcess"
import { BpmnEditor } from "@rxdrag/bpmn-editor"

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column;
`

export const ProcessEditor = memo((
  props: {
    id?: ID
  }
) => {
  const { id } = props
  const { process } = useQueryProcess(id)
  const [save, { loading: saving }] = useSaveProcess()
  const t = useTranslate()

  const handleSave = useCallback(() => {
    //
  }, [])

  return (
    <Container
      className="process-editor"
      style={{ display: id ? undefined : "none" }}
    >
      <Toolbar>
        <span>
          {process?.name}
        </span>
        <Button
          type="primary"
          loading={saving}
          //disabled={(script?.code || "") === inputValue}
          onClick={handleSave}
        >
          {
            t("Save")
          }
        </Button>
      </Toolbar>
      <BpmnEditor />
    </Container>
  )
})