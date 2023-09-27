import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Popover, Space } from "antd";
import { memo, useCallback, useEffect } from "react"
import { useSaveModule } from "../../../../hooks/useSaveModule";
import { useModule } from "../../../hooks/useModule";
import { IModule } from "../../../../interfaces/module";
import { createId } from "@rxdrag/shared";
import { PopoverFooter } from "../../common/PopoverFooter";
import { IScript } from "../../../../interfaces/script";

export const ScriptPopover = memo((
  props: {
    open?: boolean,
    onOpenChange?: (open?: boolean) => void,
    script?: IScript,
  }
) => {
  const { open, onOpenChange, script } = props;
  const [form] = Form.useForm()
  const module = useModule()
  const [saveModule, { loading }] = useSaveModule({
    onComplate: () => {
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
    if (module) {
      form.validateFields().then((value) => {
        const newModule: IModule = !script
          ? { ...module, scripts: [...module?.scripts || [], { id: createId(), name: value?.name }] }
          : { ...module, scripts: module.scripts?.map(fl => fl.id === script.id ? { ...fl, ...value } : fl) }
        saveModule(newModule)
      })
    }
  }, [form, module, saveModule, script])

  return (
    <Popover
      open={open}
      title={script ? "编辑脚本" : "添加脚本"}
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
        icon={script ? <EditOutlined /> : <PlusOutlined />}
        onClick={handleOpen}
      />
    </Popover>
  )
})