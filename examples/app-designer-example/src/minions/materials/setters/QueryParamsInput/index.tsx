import { useTranslate } from "@rxdrag/react-locales"
import { Button, Modal, Space } from "antd"
import { memo, useCallback, useState } from "react"
import { IEntityConfig } from "../../../activities/common/IEntityConfig"
import { useEnitity } from "../../../../FrontendDesigner/hooks/useEnitity"
import styled from "styled-components"
import { oneEntityIcon, orderIcon } from "@rxdrag/react-shared"
import { EntityArea } from "./EntityArea"
import { FunctionOutlined } from "@ant-design/icons"

const EntityItem = styled.div`
  display: flex;
  align-items: center;
`

const RootIcon = styled.div`
  font-size: 20px;
  margin-right: 8px;
  margin-top: -4px;
`

const Content = styled.div`
  border: solid 1px ${props => props.theme.token?.colorBorder};
  width: 100%;
  height: calc(100vh - 200px);
  padding: 8px;
  box-sizing: border-box;
  display: flex;
  flex-flow: column;
  overflow: auto;
`

const PropertiesArea = styled.div`
  margin-left: 8px;
  display: flex;
  flex-flow: column;
  box-sizing: border-box;
  border-left: solid 1px ${props => props.theme.token?.colorBorder};
`

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`


export const QueryParamsInput = memo((
  props: {
    value?: IEntityConfig,
    onChange?: (value?: IEntityConfig) => void
  }
) => {
  const { value } = props;
  const [open, setOpen] = useState<boolean>()

  const entity = useEnitity(value?.entityId)

  const t = useTranslate()
  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [])

  const handleOk = useCallback(() => {
    setOpen(false)
  }, [])

  const handleCancel = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <>
      <Button
        onClick={handleOpen}
      >
        {t("config")}
      </Button>
      <Modal
        title={t("queryConfig")}
        width={1000}
        centered
        open={open}
        onCancel={handleCancel}
        footer={
          <Footer>
            <Button>{t("reset")}</Button>
            <Space>
              <Button
                onClick={handleCancel}
              >{t("cancel")}</Button>
              <Button
                type="primary"
                onClick={handleOk}
              >{t("confirm")}</Button>
            </Space>
          </Footer>
        }
      >
        <Content>
          <EntityItem>
            <RootIcon>
              {oneEntityIcon}
            </RootIcon>
            <Space>
              <span>{entity?.label || entity?.name}</span>
              <Button type="text" size="small" icon={<FunctionOutlined />}></Button>
              <Button type="text" size="small" icon={orderIcon}></Button>
            </Space>
          </EntityItem>
          <PropertiesArea>
            <EntityArea entity={entity} />
          </PropertiesArea>
        </Content>
      </Modal>
    </>
  )
})