import { useState, useMemo } from 'react';
import { ColorPicker, Input, Space } from 'antd';
import { useToken } from 'antd/es/theme/internal';
import type { Color } from 'antd/es/color-picker';
import { Field } from '../Field';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ColorField = (props:any) => {
  const { label, value, type, onChange } = props;
  const [, token] = useToken();

  const [color, setColor] = useState<Color | string | undefined>();

  const handleColorChange = (value: Color) => {
    setColor(value);
    const colorStr = typeof value === 'string' ? value : value.toHexString();
    onChange(type, colorStr);
  };

  const bgColor = useMemo<string | undefined>(() => {
    if (color === undefined) return undefined;
    return typeof color === 'string' ? color : color.toHexString();
  }, [color]);

  const colorTriggerStyle: React.CSSProperties = {
    width: token.sizeMD,
    height: token.sizeMD,
    borderRadius: token.borderRadiusSM,
    border: `1px solid ${token?.colorBorder}`,
    backgroundColor: bgColor
  };

  return (
    <Field
      label={label}
      extra={
        <ColorPicker value={value} onChange={handleColorChange}>
          <Input
            prefix={
              <Space>
                <div style={colorTriggerStyle} />
                {bgColor && <span>{bgColor}</span>}
              </Space>
            }
          />
        </ColorPicker>
      }
    />
  );
};
