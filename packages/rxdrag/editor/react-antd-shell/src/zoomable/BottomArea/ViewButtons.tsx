import { useSettersTranslate } from "@rxdrag/react-core"
import { Button, Space, Tooltip } from "antd"
import { memo, useCallback } from "react"
import { SvgIcon } from "../../common"
import { designIcon } from "../../icons"
import { PlayCircleOutlined } from "@ant-design/icons"
import { JsonCodeDialog } from "./JsonCodeDialog"

export const ViewButtons = memo(() => {
  const t = useSettersTranslate()
  const handleDesignClick = useCallback(() => {
    //
  }, [])
  return (
    <Space>
      <Tooltip title={t("design")}>
        <div>
          <Button
            type={"text"}
            size="small"
            disabled
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
            icon={
              <PlayCircleOutlined />
            }
            onClick={handleDesignClick}
          />
        </div>
      </Tooltip>
    </Space>
  )
})