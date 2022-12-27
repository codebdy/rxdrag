import { Form, Radio, RadioChangeEvent, Row } from "antd"
import { useToken } from "antd/es/theme/internal"
import { memo, useCallback } from "react"
import { FoldExtraItem, IconView } from "../Fold/FoldExtraItem"
import { blockIcon, inlineBlock, inlineIcon, flexIcon, directionIcon, rowDirectionIcon, columnDirectionIcon, flexWrapIcon, noWrapIcon, wrapIcon } from "./icons"
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
              <Radio.Group value={value?.display} size="middle" options={[
                { label: <IconView icon={rowDirectionIcon} />, value: 'row' },
                { label: <IconView icon={columnDirectionIcon} />, value: 'column' },
              ]} optionType="button" />
            </FoldExtraItem>
            <FoldExtraItem span={12}
              title={"Flex Wrap"}
              icon={flexWrapIcon}
            >
              <Radio.Group value={value?.display} size="middle" options={[
                { label: <IconView icon={noWrapIcon} />, value: 'nowrap' },
                { label: <IconView icon={wrapIcon} />, value: 'wrap' },
              ]} optionType="button" />
            </FoldExtraItem>
          </Row>
        </div>
      }

    </div>
  )
})