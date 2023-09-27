import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Popover, Space } from "antd";
import { memo, useCallback } from "react"
import styled from "styled-components";
import { IVariable } from "../../../../../interfaces/flow";
import { useSaveModule } from "../../../../../hooks/useSaveModule";
import { useModule } from "../../../../hooks/useModule";
import { IModule } from "../../../../../interfaces/module";
import { createId } from "@rxdrag/shared";

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  //align-items: center;
`

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
    onComplate: () => {
      onOpenChange?.(false)
    }
  })

  const handleOpen = useCallback(() => {
    onOpenChange?.(true)
  }, [onOpenChange])

  const handleCancel = useCallback(() => {
    onOpenChange?.(false)
  }, [onOpenChange])

  const handleConfirm = useCallback(() => {
    if (module) {
      if (!variable) {
        form.validateFields().then(() => {
          const newModule: IModule = { ...module, variables: [...module?.variables || [], { id: createId(), name: form.getFieldValue('name') }] }
          saveModule(newModule)
        })
      }
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
          </Form>
          <Footer>
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
          </Footer>
        </>
      }
      onOpenChange={onOpenChange}
      trigger={['click']}
    >
      <Button
        size="small"
        type="text"
        icon={<PlusOutlined />}
        onClick={handleOpen}
      />
    </Popover>
  )
})