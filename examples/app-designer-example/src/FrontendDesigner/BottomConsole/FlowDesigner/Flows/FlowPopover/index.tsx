import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Popover, Space } from "antd";
import { memo, useCallback, useEffect } from "react"
import { IScopedILogicFlow } from "../../../../../interfaces/flow";
import { useSaveModule } from "../../../../../hooks/useSaveModule";
import { useModule } from "../../../../hooks/useModule";
import { IModule } from "../../../../../interfaces/module";
import { createId } from "@rxdrag/shared";
import { PopoverFooter } from "../../../common/PopoverFooter";

export const FlowPopover = memo((
  props: {
    open?: boolean,
    onOpenChange?: (open?: boolean) => void,
    flow?: IScopedILogicFlow,
  }
) => {
  const { open, onOpenChange, flow } = props;
  const [form] = Form.useForm()
  const module = useModule()
  const [saveModule, { loading }] = useSaveModule({
    onComplate: () => {
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
    if (module) {
      form.validateFields().then((value) => {
        const newModule: IModule = !flow
          ? { ...module, flows: [...module?.flows || [], { id: createId(), name: value?.name, nodes: [], lines: [] }] }
          : { ...module, flows: module.flows?.map(fl => fl.id === flow.id ? { ...fl, ...value } : fl) }
        saveModule(newModule)
      })
    }
  }, [form, module, saveModule, flow])

  return (
    <Popover
      open={open}
      title={flow ? "编辑行为流" : "添加行为流"}
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