import React from "react"
import { Form, Radio, RadioChangeEvent, Row } from "antd"
import { useToken } from "antd/es/theme/internal"
import { memo, useCallback } from "react"
import { FoldExtraItem, FoldIcon } from "../Fold/FoldExtraItem"
import { blockIcon, inlineBlock, inlineIcon, flexIcon, directionIcon, rowDirectionIcon, columnDirectionIcon, flexWrapIcon, noWrapIcon, wrapIcon, justifyContentIcon, justifyCenterIcon, flexStartIcon, flexEndIcon, spaceGroundIcon, spaceBetweenIcon, spaceEvenlyIcon, alignItemsIcon, alignItemsCenterIcon, alignItemsStartIcon, alignItemsEnd, alignItemsStretch, alignItemsBaseline, alignContentIcon, alignContentCenterIcon, alignContentStartIcon, alignContentEndIcon, alignContentSpaceAroundIcon, alignContentSpaceBetweenIcon, alignContentStretchIcon } from "./icons"
import "./style.less"

export interface IDisplay {
  display?: 'block' | 'inline-block' | 'inline' | 'flex',
  flexDirection?: string,
  flexWrap?: string,
  alignContent?: string,
  justifyContent?: string,
  alignItems?: string,
}

export const DisplaySetter = memo((
  props: {
    title?: string,
    value?: IDisplay,
    onChange?: (value?: IDisplay) => void,
  }
) => {
  const { title, value, onChange } = props

  const [, token] = useToken()

  const handleDispalyChange = useCallback((e: RadioChangeEvent) => {
    onChange?.({ ...value, display: e.target.value || undefined as unknown })
  }, [onChange, value])

  const handleDirectionChange = useCallback((e: RadioChangeEvent) => {
    onChange?.({ ...value, flexDirection: e.target.value || undefined as unknown })
  }, [onChange, value])

  const handleWrapChange = useCallback((e: RadioChangeEvent) => {
    onChange?.({ ...value, flexWrap: e.target.value || undefined as unknown })
  }, [onChange, value])

  const handleAlignContentChange = useCallback((e: RadioChangeEvent) => {
    onChange?.({ ...value, alignContent: e.target.value || undefined as unknown })
  }, [onChange, value])

  const handleJustifyContentChange = useCallback((e: RadioChangeEvent) => {
    onChange?.({ ...value, justifyContent: e.target.value || undefined as unknown })
  }, [onChange, value])

  const handlealignItemsChange = useCallback((e: RadioChangeEvent) => {
    onChange?.({ ...value, alignItems: e.target.value || undefined as unknown })
  }, [onChange, value])

  return (
    <div className="rx-display-setter">
      <Form.Item
        label={title}
      >
        <Radio.Group value={value?.display} size="middle" onChange={handleDispalyChange} options={[
          { label: <FoldIcon icon={blockIcon} />, value: 'block' },
          { label: <FoldIcon icon={inlineBlock} />, value: 'inline-block' },
          { label: <FoldIcon icon={inlineIcon} />, value: 'inline' },
          { label: <FoldIcon icon={flexIcon} />, value: 'flex' },
        ]} optionType="button" />
      </Form.Item>
      {
        value?.display === "flex" &&
        <div
          style={{ backgroundColor: token.colorBorderSecondary, padding: 8, marginBottom: 16 }}
        >
          <Row>
            <FoldExtraItem span={12}
              title={"Flex Direction"}
              icon={directionIcon}
            >
              <Radio.Group value={value?.flexDirection} options={[
                { label: <FoldIcon icon={rowDirectionIcon} />, value: 'row' },
                { label: <FoldIcon icon={columnDirectionIcon} />, value: 'column' },
              ]} optionType="button" onChange={handleDirectionChange} />
            </FoldExtraItem>
            <FoldExtraItem span={12}
              title={"Flex Wrap"}
              icon={flexWrapIcon}
            >
              <Radio.Group value={value?.flexWrap} options={[
                { label: <FoldIcon icon={noWrapIcon} />, value: 'nowrap' },
                { label: <FoldIcon icon={wrapIcon} />, value: 'wrap' },
              ]} optionType="button" onChange={handleWrapChange} />
            </FoldExtraItem>
            <FoldExtraItem span={24}
              title={"Align content"}
              icon={alignContentIcon}
              marginTop={8}
            >
              <Radio.Group value={value?.alignContent} options={[
                { label: <FoldIcon icon={alignContentCenterIcon} />, value: 'center' },
                { label: <FoldIcon icon={alignContentStartIcon} />, value: 'flex-start' },
                { label: <FoldIcon icon={alignContentEndIcon} />, value: 'flex-end' },
                { label: <FoldIcon icon={alignContentSpaceAroundIcon} />, value: 'space-around' },
                { label: <FoldIcon icon={alignContentSpaceBetweenIcon} />, value: 'space-between' },
                { label: <FoldIcon icon={alignContentStretchIcon} />, value: 'stretch' },
              ]} optionType="button" onChange={handleAlignContentChange} />
            </FoldExtraItem>
            <FoldExtraItem span={24}
              title={"Justify content"}
              icon={justifyContentIcon}
              marginTop={8}
            >
              <Radio.Group value={value?.justifyContent} options={[
                { label: <FoldIcon icon={justifyCenterIcon} />, value: 'center' },
                { label: <FoldIcon icon={flexStartIcon} />, value: 'flex-start' },
                { label: <FoldIcon icon={flexEndIcon} />, value: 'flex-end' },
                { label: <FoldIcon icon={spaceGroundIcon} />, value: 'space-around' },
                { label: <FoldIcon icon={spaceBetweenIcon} />, value: 'space-between' },
                { label: <FoldIcon icon={spaceEvenlyIcon} />, value: 'space-evenly' },
              ]} optionType="button" onChange={handleJustifyContentChange} />
            </FoldExtraItem>
            <FoldExtraItem span={24}
              title={"Align Items"}
              icon={alignItemsIcon}
              marginTop={8}
            >
              <Radio.Group value={value?.alignItems} options={[
                { label: <FoldIcon icon={alignItemsCenterIcon} />, value: 'center' },
                { label: <FoldIcon icon={alignItemsStartIcon} />, value: 'flex-start' },
                { label: <FoldIcon icon={alignItemsEnd} />, value: 'flex-end' },
                { label: <FoldIcon icon={alignItemsStretch} />, value: 'stretch' },
                { label: <FoldIcon icon={alignItemsBaseline} />, value: 'baseline' },
              ]} optionType="button" onChange={handlealignItemsChange} />
            </FoldExtraItem>
          </Row>
        </div>
      }

    </div>
  )
})