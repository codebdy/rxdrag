import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Popover, Space } from "antd";
import { memo, useCallback, useEffect } from "react"
import { IScopedILogicFlow } from "../../../../../interfaces/flow";
import { createId } from "@rxdrag/shared";
import { PopoverFooter } from "../../../common/PopoverFooter";
import { useAppFrontend } from "../../../../../hooks/useAppFrontend";
import { useSaveFrontend } from "../../../../../hooks/useSaveFrontend";
import { IAppFrontend } from "../../../../../interfaces";

export const AppFxPopover = memo((
  props: {
    open?: boolean,
    onOpenChange?: (open?: boolean) => void,
    fx?: IScopedILogicFlow,
  }
) => {
  const { open, onOpenChange, fx } = props;
  const [form] = Form.useForm()
  const front = useAppFrontend()
  const [saveFront, { loading }] = useSaveFrontend({
    onComplate: () => {
      onOpenChange?.(false)
    }
  })

  useEffect(() => {
    if (open) {
      form.setFieldsValue(fx || { name: "" })
    }
  }, [form, open, fx])

  const handleOpen = useCallback(() => {
    onOpenChange?.(true)
  }, [onOpenChange])

  const handleCancel = useCallback(() => {
    onOpenChange?.(false)
  }, [onOpenChange])

  const handleConfirm = useCallback(() => {
    if (front) {
      form.validateFields().then((value) => {
        const newFront: IAppFrontend = !fx
          ? { ...front, fxFlows: [...front?.fxFlows || [], { id: createId(), ...value }] }
          : { ...front, fxFlows: front.fxFlows?.map(vr => vr.id === fx.id ? { ...vr, ...value } : vr) }
        saveFront(newFront)
      })
    }
  }, [front, form, fx, saveFront])

  return (
    <Popover
      open={open}
      title={fx ? "编辑子流" : "添加子流"}
      content={
        <>
          <Form
            name="fx"
            labelAlign="left"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            autoComplete="off"
            style={{ paddingTop: 8 }}
            form={form}
          >
            <Form.Item
              label="名称"
              name="name"
              rules={[{ required: true, message: '必须输入变量名' }]}
            >
              <Input />
            </Form.Item>
          </Form>
          <PopoverFooter>
            <Space>
              <Button
                onClick={handleCancel}
              >取消</Button>
              <Button
                type="primary"
                loading={loading}
                onClick={handleConfirm}
              >确定</Button>
            </Space>
          </PopoverFooter>
        </>
      }
      onOpenChange={onOpenChange}
      trigger={['click']}
    >
      <Button
        size="small"
        type="text"
        icon={fx ? <EditOutlined /> : <PlusOutlined />}
        onClick={handleOpen}
      />
    </Popover>
  )
})