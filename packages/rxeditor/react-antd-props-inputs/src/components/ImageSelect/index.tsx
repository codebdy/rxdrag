import { useSettersTranslate } from "@rxdrag/react-core"
import { Col, Modal, Row } from "antd"
import { useToken } from "antd/es/theme/internal"
import React, { useCallback, useEffect } from "react"
import { memo, useState } from "react"
import styled from "styled-components"
import { ImageView } from "@rxdrag/react-antd-components"

const ImageContainer = styled.div.attrs((props: { actived?: boolean, borderColor?: string }) => ({
  ...props,
}))`
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  padding:2px;
  outline: ${props => props.actived ? props.borderColor + " solid 1px" : undefined};
`

const images = [
  "/imgs/hero.png",
  "/imgs/ad.jpg",
]

export const ImageSelect = memo((
  props: {
    children: React.ReactElement,
    value?: string,
    onChange?: (value?: string) => void,
  }
) => {
  const { children, value, onChange } = props
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<string>()
  const t = useSettersTranslate()
  const [, token] = useToken()

  useEffect(() => {
    setSelected(value)
  }, [value])

  const handleClick = useCallback(() => {
    setOpen(true)
  }, [])

  const handleOk = useCallback(() => {
    setOpen(false);
    onChange?.(selected)
  }, [onChange, selected]);

  const handleCancel = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      {React.cloneElement(children, { onClick: handleClick })}
      <Modal
        title={t('selectImage')}
        open={open}
        okText={t("confirm")}
        cancelText={t("cancel")}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{
          disabled: !selected
        }}
      >
        <Row gutter={16}>
          {
            images.map((img, index) => {
              return (
                <Col span={6} key={index}>
                  <ImageContainer
                    borderColor={token.colorPrimary}
                    actived={selected === img}
                    onClick={() => setSelected(img)}
                  >
                    <ImageView height="100%" value={img} style={{ borderRadius: 8 }} />
                  </ImageContainer>
                </Col>
              )
            })
          }
        </Row>
      </Modal>
    </>
  )
})