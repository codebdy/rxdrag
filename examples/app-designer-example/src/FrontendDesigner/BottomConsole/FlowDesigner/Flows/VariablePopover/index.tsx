import { PlusOutlined } from "@ant-design/icons";
import { Button, Popover, Space } from "antd";
import { memo, useCallback } from "react"
import { VariableForm } from "./VariableForm";
import styled from "styled-components";
import { IVariable } from "../../../../../interfaces/flow";

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

  const handleOpenAddVar = useCallback(() => {
    onOpenChange?.(true)
  }, [onOpenChange])

  return (
    <Popover
      open={open}
      title={variable ? "编辑变量" : "添加变量"}
      content={
        <>
          <VariableForm />
          <Footer>
            <Space>
              <Button>取消</Button>
              <Button type="primary">确定</Button>
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
        onClick={handleOpenAddVar}
      />
    </Popover>
  )
})