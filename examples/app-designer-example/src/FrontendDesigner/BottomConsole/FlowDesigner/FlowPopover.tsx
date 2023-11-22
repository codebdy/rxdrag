import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Popover, Space } from "antd";
import { memo, useCallback, useEffect } from "react"
import { ID, createId } from "@rxdrag/shared";
import { PopoverFooter } from "../common/PopoverFooter";
import { FxScope, IFlow, LogicType } from "../../../interfaces/flow";
import { useSaveFlow } from "../../../hooks/useSaveFlow";

export const FlowPopover = memo((
  props: {
    scope?: FxScope,
    ownerId?: ID,
    moduleId?: ID,
    open?: boolean,
    onOpenChange?: (open?: boolean) => void,
    flow?: IFlow,
    title: string,
    type?: LogicType,
  }
) => {
  const { scope, ownerId, moduleId, open, onOpenChange, flow, title, type } = props;
  const [form] = Form.useForm()

  const [save, { loading }] = useSaveFlow({
    onComplete: () => {
      onOpenChange?.(false)
    }
  })

  useEffect(() => {
    if (open) {
      form.setFieldsValue(flow || { name: "" })
    }
  }, [form, open, flow])

  const handleOpen = useCallback(() => {
    onOpenChange?.(true)
  }, [onOpenChange])

  const handleCancel = useCallback(() => {
    onOpenChange?.(false)
  }, [onOpenChange])

  const handleConfirm = useCallback(() => {
    form.validateFields().then((value) => {
      const newFx: IFlow = !flow
        ? { id: createId(), ...value, scope, ownerId, moduleId, type }
        : { ...flow, ...value }
      save(newFx)
    })
  }, [form, flow, scope, ownerId, moduleId, type, save])

  return (
    <Popover
      open={open}
      title={title}
      content={
        <>
          <Form
            name="flow"
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
              rules={[{ required: true, message: '必须输入名称' }]}
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
        icon={flow ? <EditOutlined /> : <PlusOutlined />}
        onClick={handleOpen}
      />
    </Popover>
  )
})