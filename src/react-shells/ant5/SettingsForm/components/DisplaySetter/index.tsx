import { Form, Radio, RadioChangeEvent, Row } from "antd"
import { useToken } from "antd/es/theme/internal"
import { memo, useCallback } from "react"
import { FoldExtraItem, IconView } from "../Fold/FoldExtraItem"
import { blockIcon, inlineBlock, inlineIcon, flexIcon, directionIcon, rowDirectionIcon, columnDirectionIcon, flexWrapIcon, noWrapIcon, wrapIcon, justifyContentIcon, justifyCenterIcon, flexStartIcon, flexEndIcon, spaceGroundIcon, spaceBetweenIcon, spaceEvenlyIcon, alignItemsIcon, alignItemsCenterIcon, alignItemsStartIcon, alignItemsEnd, alignItemsStretch, alignItemsBaseline, alignContentIcon, alignContentCenterIcon, alignContentStartIcon, alignContentEndIcon, alignContentSpaceAroundIcon, alignContentSpaceBetweenIcon, alignContentStretchIcon } from "./icons"
import "./style.less"

export interface IDisplay {
  display?: 'block' | 'inline-block' | 'inline' | 'flex',
  flexFlow?: string,
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
    onChange?.({ display: e.target.value || undefined as any })
  }, [onChange])

  return (
    <div className="rx-display-setter">
      <Form.Item
        label={title}
      >
        <Radio.Group value={value?.display} size="middle" onChange={handleDispalyChange} options={[
          { label: <IconView icon={blockIcon} />, value: 'block' },
          { label: <IconView icon={inlineBlock} />, value: 'inline-block' },
          { label: <IconView icon={inlineIcon} />, value: 'inline' },
          { label: <IconView icon={flexIcon} />, value: 'flex' },
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
              <Radio.Group value={value?.flexFlow} options={[
                { label: <IconView icon={rowDirectionIcon} />, value: 'row' },
                { label: <IconView icon={columnDirectionIcon} />, value: 'column' },
              ]} optionType="button" />
            </FoldExtraItem>
            <FoldExtraItem span={12}
              title={"Flex Wrap"}
              icon={flexWrapIcon}
            >
              <Radio.Group value={value?.flexWrap} options={[
                { label: <IconView icon={noWrapIcon} />, value: 'nowrap' },
                { label: <IconView icon={wrapIcon} />, value: 'wrap' },
              ]} optionType="button" />
            </FoldExtraItem>
            <FoldExtraItem span={24}
              title={"Align content"}
              icon={alignContentIcon}
              marginTop={8}
            >
              <Radio.Group value={value?.alignContent} options={[
                { label: <IconView icon={alignContentCenterIcon} />, value: 'center' },
                { label: <IconView icon={alignContentStartIcon} />, value: 'flex-start' },
                { label: <IconView icon={alignContentEndIcon} />, value: 'flex-end' },
                { label: <IconView icon={alignContentSpaceAroundIcon} />, value: 'space-around' },
                { label: <IconView icon={alignContentSpaceBetweenIcon} />, value: 'space-between' },
                { label: <IconView icon={alignContentStretchIcon} />, value: 'stretch' },
              ]} optionType="button" />
            </FoldExtraItem>
            <FoldExtraItem span={24}
              title={"Justify content"}
              icon={justifyContentIcon}
              marginTop={8}
            >
              <Radio.Group value={value?.justifyContent} options={[
                { label: <IconView icon={justifyCenterIcon} />, value: 'center' },
                { label: <IconView icon={flexStartIcon} />, value: 'flex-start' },
                { label: <IconView icon={flexEndIcon} />, value: 'flex-end' },
                { label: <IconView icon={spaceGroundIcon} />, value: 'space-around' },
                { label: <IconView icon={spaceBetweenIcon} />, value: 'space-between' },
                { label: <IconView icon={spaceEvenlyIcon} />, value: 'space-evenly' },
              ]} optionType="button" />
            </FoldExtraItem>
            <FoldExtraItem span={24}
              title={"Align Items"}
              icon={alignItemsIcon}
              marginTop={8}
            >
              <Radio.Group value={value?.alignItems} options={[
                { label: <IconView icon={alignItemsCenterIcon} />, value: 'center' },
                { label: <IconView icon={alignItemsStartIcon} />, value: 'flex-start' },
                { label: <IconView icon={alignItemsEnd} />, value: 'flex-end' },
                { label: <IconView icon={alignItemsStretch} />, value: 'stretch' },
                { label: <IconView icon={alignItemsBaseline} />, value: 'baseline' },
              ]} optionType="button" />
            </FoldExtraItem>
          </Row>
        </div>
      }

    </div>
  )
})