import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Popover, Space } from "antd";
import { memo, useCallback, useEffect } from "react"
import { ID, createId } from "@rxdrag/shared";
import { PopoverFooter } from "../../common/PopoverFooter";
import { FxScope, IFxFlow } from "../../../../interfaces/fx";
import { useSaveFxFlow } from "../../../../hooks/useSaveFxFlow";

export const FxPopover = memo((
  props: {
    scope: FxScope,
    ownerId?: ID,
    open?: boolean,
    onOpenChange?: (open?: boolean) => void,
    fx?: IFxFlow,
  }
) => {
  const { scope, ownerId, open, onOpenChange, fx } = props;
  const [form] = Form.useForm()

  const [saveFx, { loading }] = useSaveFxFlow({
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
    form.validateFields().then((value) => {
      const newFx: IFxFlow = !fx
        ? { id: createId(), ...value, scope, ownerId }
        : { ...fx, ...value }
      saveFx(newFx)
    })
  }, [form, fx, ownerId, saveFx, scope])

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
        icon={fx ? <EditOutlined /> : <PlusOutlined />}
        onClick={handleOpen}
      />
    </Popover>
  )
})