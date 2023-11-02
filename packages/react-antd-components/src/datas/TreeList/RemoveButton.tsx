import { memo, useCallback, useState } from "react";
import { Button, Popover, Space } from 'antd';
import  styled  from "styled-components";
import { DeleteOutlined, InfoCircleFilled } from "@ant-design/icons"
import { CallbackFn } from "./EditForm";

const Title = styled.div`
  padding: 16px;
  padding-bottom: 0;
`

const InfoIcon = styled(InfoCircleFilled)`
  margin-right: 8px;
  color:${props => props.theme.token?.colorWarning};
`

const Content = styled.div`
  padding: 0 16px 16px 16px;
`

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
`

export const RemoveButton = memo((
  props: {
    idKey: string,
    labelKey: string,
    onOpenChange?: (open: boolean) => void,
    value?: unknown,
    onDelete?:(finishCallback:CallbackFn)=>void
  }
) => {
  const { idKey, labelKey, onOpenChange, value, onDelete } = props
  const [open, setOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const handleOpenChange = useCallback((opn: boolean) => {
    setOpen(opn)
    onOpenChange?.(opn)
  }, [onOpenChange])

  const handleCancel = useCallback(() => {
    setOpen(false)
    onOpenChange?.(false)
  }, [onOpenChange])


  const handleConfirm = useCallback(() => {
    //remove(value?.[treeFieldNames.key || ""])
  }, [])


  const handleBlockClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
  }, [])

  return (
    <Popover
      title={<Title
        onClick={handleBlockClick}
      >
        <InfoIcon />
        <span>删除流程分组</span>
      </Title>}
      overlayInnerStyle={{ padding: 0 }}
      open={open}
      content={
        <Content onClick={handleBlockClick}>
          <div>删除后将不可恢复，确定要删除？</div>
          <Footer>
            <Space>
              <Button
                size="small"
                onClick={handleCancel}>否</Button>
              <Button
                type="primary"
                size="small"
                loading={deleting}
                onClick={handleConfirm}>是</Button>
            </Space>
          </Footer>
        </Content>
      }
      trigger="click"
      placement="top"
      onOpenChange={handleOpenChange}
    >
      <Button type="text" size="small" icon={<DeleteOutlined />} />
    </Popover>
  )
})