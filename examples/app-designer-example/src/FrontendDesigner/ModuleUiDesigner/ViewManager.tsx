import { NumberOutlined } from "@ant-design/icons"
import { Button, Popover, Space } from "antd"
import { memo, useCallback, useState } from "react"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  flex-flow: column;
`

const Content = styled.div`
  
`

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

export const ViewManager = memo(() => {
  const [open, setOpen] = useState<boolean>()

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <Popover
      open={open}
      placement="topRight"
      title={"视图管理"}
      content={<Container>
        <Content>

        </Content>
        <Footer>
          <Space>
            <Button onClick={handleClose}>取消</Button>
            <Button type="primary">确定</Button>
          </Space>
        </Footer>
      </Container>}
      trigger="click"
      onOpenChange={setOpen}
    >
      <Button
        type={open ? "link" : "text"}
        size="small"
        icon={
          <NumberOutlined />
        }
      />
    </Popover>
  )
})