import { useSettersTranslate } from "@rxdrag/react-core"
import { Button, Space, Tooltip } from "antd"
import { memo, useCallback } from "react"
import { SvgIcon } from "../../common"
import { designIcon } from "../../icons"
import { PlayCircleOutlined } from "@ant-design/icons"
import { JsonCodeDialog } from "./JsonCodeDialog"
import { usePreviewState } from "../contexts"

export const ViewButtons = memo(() => {
  const [preview, setPreview] = usePreviewState()
  const t = useSettersTranslate()
  const handleDesignClick = useCallback(() => {
    setPreview(false)
  }, [setPreview])

  const handlePreviewClick = useCallback(() => {
    setPreview(true)
  }, [setPreview])

  return (
    <Space>
      <Tooltip title={t("design")}>
        <div>
          <Button
            type={"text"}
            size="small"
            disabled={!preview}
            icon={
              <SvgIcon>
                {designIcon}
              </SvgIcon>
            }
            onClick={handleDesignClick}
          />
        </div>
      </Tooltip>
      <JsonCodeDialog />
      <Tooltip title={t("preview")}>
        <div>
          <Button
            type={"text"}
            size="small"
            disabled={preview}
            icon={
              <PlayCircleOutlined />
            }
            onClick={handlePreviewClick}
          />
        </div>
      </Tooltip>
    </Space>
  )
})