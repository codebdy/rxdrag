import { useSettersTranslate } from "@rxdrag/react-core"
import { Button, Space, Tooltip } from "antd"
import { memo } from "react"
import { PlusOutlined } from "@ant-design/icons"
import { JsonCodeDialog } from "./JsonCodeDialog"

export const ViewButtons = memo(() => {
  const t = useSettersTranslate()

  return (
    <Space>
      <JsonCodeDialog />
      <Tooltip title={t("addView")}>
        <div>
          <Button
            type={"text"}
            size="small"
            icon={
              <PlusOutlined />
            }
            //onClick={handlePreviewClick}
          />
        </div>
      </Tooltip>
    </Space>
  )
})