import { useTranslate } from "@rxdrag/react-locales"
import { Button, Modal } from "antd"
import { memo, useCallback, useState } from "react"
import { IEntityConfig } from "../../../activities/common/IEntityConfig"
import { useEnitity } from "../../../../FrontendDesigner/hooks/useEnitity"

export const QueryParamsInput = memo((
  props: {
    value?: IEntityConfig,
    onChange?: (value?: IEntityConfig) => void
  }
) => {
  const { value } = props;
  const [open, setOpen] = useState<boolean>()

  const entity = useEnitity(value?.entityId)

  const t = useTranslate()
  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [])

  const handleOk = useCallback(() => {
    setOpen(false)
  }, [])

  const handleCancel = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <>
      <Button
        onClick={handleOpen}
      >
        {t("config")}
      </Button>
      <Modal
        title={t("queryConfig")}
        width={1000}
        styles={{
          body: {
            height: "calc(100vh - 160px)",
          }
        }}
        centered
        open={open}
        okText={t("confirm")}
        cancelText={t("cancel")}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          {entity?.label|| entity?.name}
        </div>
      </Modal>
    </>
  )
})