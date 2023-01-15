import { Button, Modal, Space } from "antd"
import { useToken } from "antd/es/theme/internal";
import { memo, useCallback, useState } from "react"
import { redoIcon, undoIcon } from "react-shells/ant5/icons";
import styled from "styled-components";

const SytledContent = styled.div`
  height: calc(100vh - 100px);
  display: flex;
  border: solid 1px;
`

const LeftArea = styled.div`
  width: 220px;
  border-right: solid 1px;
  padding: 8px;
`

const CenterArea = styled.div`
  flex:1;
  display: flex;
  flex-flow: column;
`

const Toolbar = styled.div`
  display: flex;
  padding: 0 8px;
  height: 40px;
  align-items: center;
  border-bottom: solid 1px;
`

const CanvasContainer = styled.div`
  flex: 1
`

const PropertyBox = styled.div`
  width: 220px;
  border-left: solid 1px;
  padding: 8px;
`

export const FunctionsInput = memo((props: {
  title: string
}) => {
  const { title, ...other } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [, token] = useToken()

  const showModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <Button {...other} onClick={showModal}>{title}</Button>
      <Modal
        title={title}
        open={isModalOpen}
        footer={false}
        onCancel={handleCancel}
        width={"calc(100vw - 40px)"}
        centered
      >
        <SytledContent style={{ borderColor: token.colorBorder }}>
          <LeftArea style={{ borderColor: token.colorBorder }}>
            left
          </LeftArea>
          <CenterArea>
            <Toolbar style={{ borderColor: token.colorBorder }}>
              <Space>
                <Button shape="circle" type="text" icon={undoIcon}></Button>
                <Button shape="circle" disabled type="text" icon={redoIcon}></Button>
              </Space>
            </Toolbar>
            <CanvasContainer style={{ backgroundColor: token.colorBgContainer }}>
              CanvasContainer
            </CanvasContainer>
          </CenterArea>
          <PropertyBox style={{ borderColor: token.colorBorder }}>
            right
          </PropertyBox>
        </SytledContent>
      </Modal>
    </>

  )
})