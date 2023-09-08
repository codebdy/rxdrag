import { memo, useCallback, useState } from "react";
import { Button, Popover, Space } from 'antd';
import type { FieldNames } from ".";
import { defaultFieldNames } from ".";
import { DeleteOutlined, InfoCircleFilled } from "@ant-design/icons"
import styled from "styled-components";

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
    treeFieldNames?: FieldNames,
    entityConfig: IEntityConfig,
    onOpenChange?: (open: boolean) => void,
    value?: unknown,
  }
) => {
  const { treeFieldNames = defaultFieldNames, entityConfig, onOpenChange, value } = props
  const [open, setOpen] = useState(false)

  const [remove, { deleting }] = useDeleteById(
    {
      api: entityConfig.curdApi.deleteById,
      entity: entityConfig.entity,
    },
    {
      onComplete: () => {
        setOpen(false)
        onOpenChange?.(false)
      }
    }
  )

  const handleOpenChange = useCallback((opn: boolean) => {
    setOpen(opn)
    onOpenChange?.(opn)
  }, [onOpenChange])

  const handleCancel = useCallback(() => {
    setOpen(false)
    onOpenChange?.(false)
  }, [onOpenChange])


  const handleConfirm = useCallback(() => {
    remove(value?.[treeFieldNames.key || ""])
  }, [remove, treeFieldNames.key, value])


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