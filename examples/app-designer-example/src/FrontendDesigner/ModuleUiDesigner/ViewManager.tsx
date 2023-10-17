import { NumberOutlined } from "@ant-design/icons"
import { Tooltip, Button } from "antd"
import { memo } from "react"

export const ViewManager = memo(() => {
  return (
    <Tooltip title={"视图管理"} placement="topRight">
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
  )
})