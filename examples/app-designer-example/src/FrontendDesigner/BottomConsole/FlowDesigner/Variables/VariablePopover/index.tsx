import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Popover, Space } from "antd";
import { memo, useCallback, useEffect } from "react"
import { useSaveModule } from "../../../../../hooks/useSaveModule";
import { useModule } from "../../../../hooks/useModule";
import { IModule } from "../../../../../interfaces/module";
import { createId } from "@rxdrag/shared";
import { PopoverFooter } from "../../../common/PopoverFooter";
import { ValueInput } from "@rxdrag/react-antd-props-inputs";
import { IVariable } from "@rxdrag/minions-schema";

export const VariablePopover = memo((
  props: {
    open?: boolean,
    onOpenChange?: (open?: boolean) => void,
    variable?: IVariable,
  }
) => {
  const { open, onOpenChange, variable } = props;
  const [form] = Form.useForm()
  const module = useModule()
  const [saveModule, { loading }] = useSaveModule({
    onComplete: () => {
      onOpenChange?.(false)
    }
  })

  useEffect(() => {
    if (open) {
      form.setFieldsValue(variable || { name: "", defaultValue: null })
    }
  }, [form, open, variable])

  const handleOpen = useCallback(() => {
    onOpenChange?.(true)
  }, [onOpenChange])

  const handleCancel = useCallback(() => {
    onOpenChange?.(false)
  }, [onOpenChange])

  const handleConfirm = useCallback(() => {
    if (module) {
      form.validateFields().then((value) => {
        const newModule: IModule = !variable
          ? { ...module, variables: [...module?.variables || [], { id: createId(), ...value }] }
          : { ...module, variables: module.variables?.map(vr => vr.id === variable.id ? { ...vr, ...value } : vr) }
        saveModule(newModule)
      })
    }
  }, [form, module, saveModule, variable])

  return (
    <Popover
      open={open}
      title={variable ? "编辑变量" : "添加变量"}
      content={
        <>
          <Form
            name="varialble"
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
            <Form.Item
              label="默认值"
              name="defaultValue"
            >
              <ValueInput />
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
        icon={variable ? <EditOutlined /> : <PlusOutlined />}
        onClick={handleOpen}
      />
    </Popover>
  )
})