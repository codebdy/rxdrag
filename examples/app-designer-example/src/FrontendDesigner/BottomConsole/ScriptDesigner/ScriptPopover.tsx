import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Popover, Space } from "antd";
import { memo, useCallback, useEffect } from "react"
import { ID, createId } from "@rxdrag/shared";
import { PopoverFooter } from "../common/PopoverFooter";
import { FxScope, IScript, LogicType } from "../../../interfaces/flow";
import { useSaveScript } from "../../../hooks/useSaveScript";

export const ScriptPopover = memo((
  props: {
    title: string,
    scope?: FxScope,
    type: LogicType,
    ownerId?: ID,
    moduleId?: ID,
    open?: boolean,
    onOpenChange?: (open?: boolean) => void,
    script?: IScript,
  }
) => {
  const { title, scope, type, ownerId, moduleId, open, onOpenChange, script } = props;
  const [form] = Form.useForm()

  const [saveFx, { loading }] = useSaveScript({
    onComplete: () => {
      onOpenChange?.(false)
    }
  })

  useEffect(() => {
    if (open) {
      form.setFieldsValue(script || { name: "" })
    }
  }, [form, open, script])

  const handleOpen = useCallback(() => {
    onOpenChange?.(true)
  }, [onOpenChange])

  const handleCancel = useCallback(() => {
    onOpenChange?.(false)
  }, [onOpenChange])

  const handleConfirm = useCallback(() => {
    form.validateFields().then((value) => {
      const newScript: IScript = !script
        ? { id: createId(), ...value, scope, ownerId, moduleId, type }
        : { ...script, ...value }
      saveFx(newScript)
    })
  }, [form, script, scope, ownerId, moduleId, type, saveFx])

  return (
    <Popover
      open={open}
      title={title}
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
        icon={script ? <EditOutlined /> : <PlusOutlined />}
        onClick={handleOpen}
      />
    </Popover>
  )
})