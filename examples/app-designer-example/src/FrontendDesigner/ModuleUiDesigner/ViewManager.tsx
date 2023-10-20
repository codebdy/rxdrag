import { CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined, NumberOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, Dropdown, Input, List, MenuProps, Popover, Space } from "antd"
import { memo, useCallback, useEffect, useState } from "react"
import styled from "styled-components"
import { useModule } from "../hooks/useModule"
import { IViewSchema, ViewType } from "@rxdrag/schema"
import { createId } from "@rxdrag/shared"
import { useSaveModule } from "../../hooks/useSaveModule"

const Title = styled.div`
  display: flex;
  justify-content: space-between;
`

const Container = styled.div`
  display: flex;
  flex-flow: column;
`

const Content = styled.div`
  display: flex;
  flex-flow: column;
  padding-bottom: 8px;
  width: 260px;
`

const ListItem = styled(List.Item)`
  cursor: pointer;
  padding: 0 8px !important;
  height: 32px;
  display: flex;
  align-items: center;
  border-block-end: none !important;
  &:hover{
    background-color: ${props => props.theme?.token?.colorBorderSecondary};
  }

  &.selected{
    background-color: ${props => props.theme?.token?.colorInfoBgHover};
  }
`

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const items: MenuProps['items'] = [
  {
    label: "添加对话框",
    key: 'dialog',
  },
  {
    label: "添加抽屉",
    key: 'drawer',
  },

];

const ViewItem = memo((
  props: {
    view: IViewSchema,
    onRemove?: (id: string) => void,
    onChange?: (view: IViewSchema) => void
  }
) => {
  const { view, onRemove, onChange } = props;
  const [title, setTitle] = useState<string>()
  const [editing, setEditing] = useState<boolean>()
  const [hover, setHover] = useState(false);

  useEffect(() => {
    setTitle(view.title)
  }, [view.title])

  const handleMouseOver = useCallback(() => {
    setHover(true)
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHover(false)
  }, []);

  const handleRemove = useCallback(() => {
    onRemove?.(view.id)
  }, [onRemove, view.id]);

  const handleEdit = useCallback(() => {
    setEditing(true)
  }, []);

  const handleCancel = useCallback(() => {
    setEditing(false)
    setTitle(view.title)
  }, [view.title]);

  const handleOk = useCallback(() => {
    setEditing(false)
    onChange?.({ ...view, title })
  }, [onChange, title, view]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }, [])

  return (
    <ListItem
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      {
        editing
          ? <Input
            value={title}
            onChange={handleChange}
          />
          : <span>{title}</span>
      }

      {
        hover && view.viewType !== ViewType.Main && !editing &&
        <Space>
          <Button
            type="text"
            size="small"
            icon={<DeleteOutlined />}
            onClick={handleRemove}
          />
          <Button
            type="text"
            size="small"
            icon={<EditOutlined />}
            onClick={handleEdit}
          />
        </Space>
      }

      {
        editing &&
        <Space
          style={{ marginLeft: 8 }}
        >
          <Button
            type="text"
            size="small"
            icon={<CloseOutlined />}
            onClick={handleCancel}
          />
          <Button
            type="text"
            size="small"
            icon={<CheckOutlined />}
            onClick={handleOk}
          />
        </Space>
      }

    </ListItem>
  )
})

export const ViewManager = memo(() => {
  const [open, setOpen] = useState<boolean>()
  const [views, setViews] = useState<IViewSchema[]>()
  const module = useModule()
  const [saveModule, { loading }] = useSaveModule({
    onComplete: () => {
      setOpen(false)
    }
  })

  useEffect(() => {
    setViews(module?.views)
  }, [module?.views])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  const handleRemove = useCallback((id: string) => {
    setViews(views => views?.filter(vw => vw.id !== id))
  }, [])

  const handleAdd = useCallback(({ key }: { key: string }) => {
    const comName = key === "dialog" ? "Dialog" : "Drawer"
    const title = key === "dialog" ? "新建对话框" : "新建抽屉"
    setViews(views => [
      ...views || [],
      {
        id: createId(),
        title: title,
        schema: { componentName: comName }
      }
    ])

  }, [])

  const handleConfirm = useCallback(() => {
    if (module) {
      saveModule({ ...module, views })
    }
  }, [module, saveModule, views])

  return (
    <Popover
      open={open}
      placement="topRight"
      title={
        <Title>
          <span>管理视图</span>
          <Dropdown
            menu={{ items, onClick: handleAdd }}
            trigger={['click']}
            placement="topRight"
          >
            <Button
              type="text"
              size="small"
              icon={<PlusOutlined />}
            />
          </Dropdown>
        </Title>
      }
      content={<Container>
        <Content>
          <List
            bordered={false}
            dataSource={views}
            renderItem={(item) => (
              <ViewItem
                view={item}
                onRemove={handleRemove}
              />
            )}
          />
        </Content>
        <Footer>
          <Space>
            <Button onClick={handleClose}>取消</Button>
            <Button
              type="primary"
              loading={loading}
              onClick={handleConfirm}
            >确认</Button>
          </Space>
        </Footer>
      </Container>}
      trigger="click"
      onOpenChange={setOpen}
    >
      <Button
        type={open ? "link" : "text"}
        size="small"
        icon={
          <NumberOutlined />
        }
      />
    </Popover>
  )
})