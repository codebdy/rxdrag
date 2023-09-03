import { useSettersTranslate } from "@rxdrag/react-core"
import { Col, Modal, Row } from "antd"
import { useCallback, useEffect } from "react"
import { memo, useState } from "react"
import styled from "styled-components"
import { ImageView } from "@rxdrag/react-antd-components"
import classNames from "classnames"

const SelectedImageView = styled.div`
  width: 100px;
  height: 70px;
  border: solid 1px ${props => props.theme?.token?.colorBorder};
  img{
    width: 100%;
  }
  overflow: hidden;
`

const ImageContainer = styled.div`
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  padding:2px;
  border: solid 1px transparent;
  &.activied{
    border-color: ${props => props.theme?.token?.colorPrimary};
  }
`

const images = [
  "/imgs/hero.png",
  "/imgs/ad.jpg",
]

export const ImageSelect = memo((
  props: {
    value?: string,
    onChange?: (value?: string) => void,
  }
) => {
  const { value, onChange } = props
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<string>()
  const t = useSettersTranslate()

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
      <SelectedImageView onClick={handleClick}>
        <img src={value} />
      </SelectedImageView>
      <Modal
        title={t('selectImage') + " - 本组件演示用，实际项目请更换"}
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
                    className={classNames({ activied: selected === img })}
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