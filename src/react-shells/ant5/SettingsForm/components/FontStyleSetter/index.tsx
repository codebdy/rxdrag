import React, { memo } from 'react'
import { Col, Input, InputNumber, Select } from 'antd'
import { FoldItemBase, FoldItem, FoldItemExtra } from '../FoldItem'
import { ValueRow } from '../FoldItem/ValueRow'
import { ValueColumn, ValueIcon } from '../FoldItem/ValueColumn'
import { fontStyleIcon, fontWeightIcon } from './icons'

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
              <InputNumber />
            </ValueColumn>
            <Col span={12}><Input /></Col>
            <Col span={12} style={{ marginTop: 8 }}><Input /></Col>
            <Col span={12} style={{ marginTop: 8 }}><Input /></Col>
          </ValueRow>

        </FoldItemExtra>
      </FoldItem >
    )
  }
)
