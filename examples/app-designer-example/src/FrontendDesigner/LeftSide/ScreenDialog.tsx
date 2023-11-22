import { SettingOutlined } from "@ant-design/icons"
import { memo, useCallback, useEffect, useState } from "react"
import { Button, Form, InputNumber, Modal } from "antd";
import styled from "styled-components";
import { useAppFrontend } from "../../hooks/useAppFrontend";

const SizeInput = styled(InputNumber)`
  width: 120px;
`


//本代码未加保存功能
export const ScreenDialog = memo(() => {
  const [open, setOpen] = useState(false);
  const frontend = useAppFrontend()
  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleOk = useCallback(() => {
    setOpen(false);
  }, []);

  const handleCancel = useCallback(() => {
    setOpen(false);
  }, []);

  const [form]  = Form.useForm()

  useEffect(()=>{
    form.setFieldsValue(frontend?.canvasConfig)
  },[form, frontend?.canvasConfig])

  return (
    <>
      <Button
        icon={<SettingOutlined />}
        type="text"
        onClick={handleOpen}
      />
      <Modal
        title="配置"
        width={320}
        open={open}
        okText="确定"
        cancelText="取消"
        forceRender
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          labelAlign="left"
          labelCol={{ span: 8}}
          wrapperCol={{ span: 16 }}
          initialValues={frontend?.canvasConfig}
          autoComplete="off"
          form = {form}
        >
          <Form.Item
            label="实际屏宽"
            name="screenWidth"
          >
            <SizeInput />
          </Form.Item>

          <Form.Item
            label="画布宽度"
            name="canvasWidth"
          >
            <SizeInput />
          </Form.Item>
          <Form.Item
            label="画布高度"
            name="canvasHeight"
          >
            <SizeInput />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
})