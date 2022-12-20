import React, { memo } from 'react'
import { InputNumber, Radio, Select } from 'antd'
import { FoldItemBase, FoldItem, FoldItemExtra } from '../FoldItem'
import { ValueRow } from '../FoldItem/ValueRow'
import { IconView, ValueColumn } from '../FoldItem/ValueColumn'
import { fontColorIcon, fontSizeIcon, fontStyleIcon, fontWeightIcon, italicFontSyleIcon, lineHeightIcon, normalFontStyleIcon, textAlignCenterIcon, textAlignIcon, textAlignJustifyIcon, textAlignLeftIcon, textAlignRightIcon, textDecorationIcon, textLineThrough, textUnlineIcon } from './icons'
import { ColorInput } from '../ColorInput'
import { SizeInput } from '../SizeInput'

export interface IFontStyleSetterProps {
  className?: string
  style?: React.CSSProperties
}

const createFontFamilyOptions = (fonts: string[]) => {
  return fonts.map((font) => {
    const splited = font.split('=')
    const label = splited?.[0]
    const value = splited?.[1]
    return {
      label: <span style={{ fontFamily: value }}>{label}</span>,
      value,
    }
  })
}

const FontFamilyOptions = createFontFamilyOptions([
  "",
  '宋体=SimSun',
  '微软雅黑=Microsoft Yahei',
  '苹方=PingFang SC',
  'Andale Mono=andale mono,monospace',
  'Arial=arial,helvetica,sans-serif',
  'Arial Black=arial black,sans-serif',
  'Book Antiqua=book antiqua,palatino,serif',
  'Comic Sans MS=comic sans ms,sans-serif',
  'Courier New=courier new,courier,monospace',
  'Georgia=georgia,palatino,serif',
  'Helvetica Neue=Helvetica Neue',
  'Helvetica=helvetica,arial,sans-serif',
  'Impact=impact,sans-serif',
  'Symbol=symbol',
  'Tahoma=tahoma,arial,helvetica,sans-serif',
  'Terminal=terminal,monaco,monospace',
  'Times New Roman=times new roman,times,serif',
  'Trebuchet MS=trebuchet ms,geneva,sans-serif',
  'Verdana=verdana,geneva,sans-serif',
])

export const FontStyleSetter: React.FC<IFontStyleSetterProps> = memo(
  (props) => {

    return (
      <FoldItem>
        <FoldItemBase label='字体'>
          <Select
            options={FontFamilyOptions}
          />
        </FoldItemBase>
        <FoldItemExtra>
          <ValueRow>
            <ValueColumn span={12}
              title="字重"
              icon={fontWeightIcon}
            >
              <InputNumber />
            </ValueColumn>
            <ValueColumn span={12}
              title="风格"
              icon={fontStyleIcon}
            >
              <Radio.Group options={[
                { label: <IconView icon={normalFontStyleIcon} />, value: 'normal' },
                { label: <IconView icon={italicFontSyleIcon} />, value: 'italic' },
              ]}
                optionType="button" />
            </ValueColumn>
            <ValueColumn span={24}
              title="颜色"
              icon={fontColorIcon}
              onFirstLine={false}
            >
              <ColorInput />
            </ValueColumn>
            <ValueColumn span={12}
              title="大小"
              icon={fontSizeIcon}
              onFirstLine={false}
            >
              <SizeInput exclude={"auto"} />
            </ValueColumn>
            <ValueColumn span={12}
              title="行高"
              icon={lineHeightIcon}
              onFirstLine={false}
            >
              <SizeInput exclude={"auto"} />
            </ValueColumn>
            <ValueColumn span={24}
              title="对齐"
              icon={textAlignIcon}
              onFirstLine={false}
            >
              <Radio.Group options={[
                { label: <IconView icon={textAlignLeftIcon} />, value: 'left' },
                { label: <IconView icon={textAlignCenterIcon} />, value: 'center' },
                { label: <IconView icon={textAlignRightIcon} />, value: 'right' },
                { label: <IconView icon={textAlignJustifyIcon} />, value: 'justify' },
              ]}
                optionType="button" />
            </ValueColumn>
            <ValueColumn span={24}
              title="修饰"
              icon={textDecorationIcon}
              onFirstLine={false}
            >
              <Radio.Group options={[
                { label: '--', value: 'none' },
                { label: <IconView icon={textUnlineIcon} />, value: 'underline' },
                { label: <IconView icon={textLineThrough} />, value: 'line-through' },
              ]}
                optionType="button" />
            </ValueColumn>
          </ValueRow>

        </FoldItemExtra>
      </FoldItem >
    )
  }
)
