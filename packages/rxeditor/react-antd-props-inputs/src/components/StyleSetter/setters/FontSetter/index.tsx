import { useCallback, useMemo, useState } from 'react';
import { Row, Col, InputNumber, Select } from 'antd';
import { isNil } from 'lodash';
import { useToken } from 'antd/es/theme/internal';
import type { Color } from 'antd/es/color-picker';
import { FieldGroup, Field, RadioField, ColorField } from '../../components';
import { Header } from './Header';
import {
  fontWeightOptions,
  fontFamilyOptions,
  textAlign,
  fontStyle,
  textDecoration
} from './config';
import { fontStyleProps } from '../../config';
import { SetterProps } from '../../types';

export const FontSetter = (props: SetterProps) => {
  const { onStyleChange, value } = props;
  const [, token] = useToken();

  // 自定义文本属性
  const [fontGroupStyle, setFontGroupStyle] = useState<string | undefined>();
  const [activeKey, setActiveKey] = useState<string | undefined>();

  const handleChange = useCallback(
    (key: string, value: any) => {
      let nextValue = value === 'default' ? undefined : value;
      console.log('key', key, value);
      setActiveKey(undefined);
      if (key === 'fontSize' || key === 'lineHeight') {
        nextValue = nextValue + 'px';
        // 自定义
      } else if (key === '__font__') {
        setFontGroupStyle(value);
        value === 'custom' && setActiveKey('panel');
      }
      onStyleChange?.(key, nextValue);
    },
    [onStyleChange]
  );

  const handleColorChange = (styleKey: string, value: Color) => {
    handleChange(styleKey, value);
  };

  const formattedFontSize = useMemo(() => {
    if (value?.['fontSize'] === undefined) return undefined;
    const parsed = parseInt(value?.['fontSize']);
    return Number.isNaN(parsed) ? undefined : parsed;
  }, [value]);

  const formattedLineHeight = useMemo(() => {
    if (value?.['lineHeight'] === undefined) return undefined;
    const parsed = parseInt(value?.['lineHeight']);
    return Number.isNaN(parsed) ? undefined : parsed;
  }, [value]);

  const groupTitle = useMemo(() => {
    let actived = false;
    for (const key of fontStyleProps) {
      if (!isNil(value?.[key])) {
        actived = true;
        break;
      }
    }
    return (
      <span style={actived ? { color: token.colorPrimary } : {}}>文字</span>
    );
  }, [value]);

  return (
    <div className="font-style-container" key={fontGroupStyle || 'fontStyle'}>
      <FieldGroup
        title={groupTitle}
        extra={
          <Header
            value={value?.['__font__']}
            onChange={(value: unknown) => handleChange('__font__', value)}
          />
        }
        activeKey={activeKey}
      >
        <Row>
          <Col span={12}>
            <Field
              label="字号"
              extra={
                <InputNumber
                  style={{ width: '100%' }}
                  defaultValue={14}
                  value={formattedFontSize}
                  onChange={value => handleChange('fontSize', value)}
                  addonAfter="px"
                />
              }
            ></Field>
          </Col>
          <Col span={12}>
            <Field
              label="行高"
              extra={
                <InputNumber
                  style={{ width: '100%' }}
                  defaultValue={22}
                  value={formattedLineHeight}
                  onChange={value => handleChange('lineHeight', value)}
                  addonAfter="px"
                />
              }
            ></Field>
          </Col>
        </Row>
        <Field
          label="字重"
          extra={
            <Select
              style={{ width: '100%' }}
              placeholder="请选择"
              value={value?.['fontWeight']}
              onChange={value => handleChange('fontWeight', value)}
              options={fontWeightOptions}
            />
          }
        />
        <Field
          label="字体"
          extra={
            <Select
              style={{ width: '100%' }}
              placeholder="请选择"
              value={value?.['fontFamily']}
              onChange={value => handleChange('fontFamily', value)}
              options={fontFamilyOptions}
            />
          }
        />
        <ColorField
          label="文字颜色"
          type="color"
          value={value?.['color']}
          onChange={handleColorChange}
        />
        <RadioField
          options={textAlign.options}
          styleKey="textAlign"
          label={textAlign.title}
          onChange={onStyleChange}
          value={value?.['textAlign']}
        />
        <RadioField
          options={fontStyle.options}
          styleKey="fontStyle"
          label={fontStyle.title}
          onChange={onStyleChange}
          value={value?.['fontStyle']}
        />
        <RadioField
          options={textDecoration.options}
          styleKey="textDecoration"
          label={textDecoration.title}
          onChange={onStyleChange}
          value={value?.['textDecoration']}
        />
      </FieldGroup>
    </div>
  );
};
