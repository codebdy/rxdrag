import { useTranslate } from "@rxdrag/react-locales"
import { Button, Modal, Space } from "antd"
import { memo, useCallback, useEffect, useState } from "react"
import { useEnitity } from "../../../../FrontendDesigner/hooks/useEnitity"
import styled from "styled-components"
import { oneEntityIcon } from "@rxdrag/react-shared"
import { EntityArea } from "./EntityArea"
import { PropertiesArea } from "./PropertiesArea"
import { Footer } from "./Footer"
import { ExprssionDrawer } from "./ExprssionDrawer"
import { IEntityQueryConfig, IQureyEnitiyParam } from "../../../activities/common/IEntityQueryConfig"
import { IExpression, IExpressionGroup } from "../../../activities/common/interfaces"
import { SortPopover } from "./SortPopover"

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
  background-color: ${props => props.theme?.token?.colorBgBase} !important;
`

export const QueryParamsInput = memo((
  props: {
    value?: IEntityQueryConfig,
    onChange?: (value?: IEntityQueryConfig) => void
  }
) => {
  const { value, onChange } = props;
  const [inputValue, setInputValue] = useState<IEntityQueryConfig>()
  const [open, setOpen] = useState<boolean>()

  useEffect(() => {
    setInputValue(value)
  }, [value])

  const entity = useEnitity(value?.entityId)

  const t = useTranslate()
  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [])

  const handleOk = useCallback(() => {
    onChange?.(inputValue)
    setOpen(false)
  }, [inputValue, onChange])

  const handleCancel = useCallback(() => {
    setOpen(false)
  }, [])

  const handleRootExpressionChange = useCallback((exprs?: (IExpression | IExpressionGroup)[]) => {
    setInputValue({ ...inputValue, queryParams: { ...inputValue?.queryParams, expressions: exprs } })
  }, [inputValue])

  const handleRootParamsChange = useCallback((params?: IQureyEnitiyParam) => {
    setInputValue({ ...inputValue, queryParams: params })
  }, [inputValue])

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
            <Button>
              {t("reset")}
            </Button>
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
              {
                entity && <>
                  <ExprssionDrawer
                    entityId={entity?.uuid}
                    value={inputValue?.queryParams?.expressions}
                    onChange={handleRootExpressionChange}
                  />
                  <SortPopover />
                </>
              }
            </Space>
          </EntityItem>
          <PropertiesArea>
            <EntityArea
              entity={entity}
              value={inputValue?.queryParams}
              onChange={handleRootParamsChange}
            />
          </PropertiesArea>
        </Content>
      </Modal>
    </>
  )
})