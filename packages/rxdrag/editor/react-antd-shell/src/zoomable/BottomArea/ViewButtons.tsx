import { useSettersTranslate } from "@rxdrag/react-core"
import { Button, Space, Tooltip } from "antd"
import { memo } from "react"
import { NumberOutlined } from "@ant-design/icons"
import { JsonCodeDialog } from "./JsonCodeDialog"

export const ViewButtons = memo(() => {
  const t = useSettersTranslate()

  return (
    <Space>
      <JsonCodeDialog />
      <Tooltip title={t("views")}>
        <div>
          <Button
            type={"text"}
            size="small"
            icon={
              <NumberOutlined />
            }
            //onClick={handlePreviewClick}
          />
        </div>
      </Tooltip>
    </Space>
  )
})