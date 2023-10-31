import { memo, useCallback } from 'react';
import { pick, omit } from 'lodash';

import {
  SizeSetter,
  LayoutSetter,
  FontSetter,
  BackgroundSetter,
  BorderSetter,
  OpacitySetter
} from './setters';
import { defaultOptions as fontOptions } from './setters/FontSetter/config';
import {
  borderStyleProps,
  flexStyleProps,
  fontStyleProps,
  backgroundStyleProps,
  borderRadiusStyleProps
} from './config';
import { StyleChangeListener, StyleData } from './types';

export const StyleSetter = memo(
  (props: { value?: any; onChange?: (value?: any) => void }) => {
    const { onChange, value } = props;

    const handleStyleChange: StyleChangeListener = useCallback(
      (styleKey: string, styleData: StyleData) => {
        let nextValue = { ...value, ...{ [styleKey]: styleData } };
        // 显示模式
        if (styleKey === 'display') {
          if (styleData !== 'flex') {
            // 选中非 flex 布局，直接忽略 flex 属性
            nextValue = {
              ...omit(value, flexStyleProps),
              ...{ [styleKey]: styleData }
            };
          }
        }
        if (styleKey === 'margin' || styleKey === 'padding') {
          const pos =
            styleKey === 'margin'
              ? {
                  marginTop: styleData,
                  marginRight: styleData,
                  marginBottom: styleData,
                  marginLeft: styleData
                }
              : {
                  paddingTop: styleData,
                  paddingRight: styleData,
                  paddingBottom: styleData,
                  paddingLeft: styleData
                };
          nextValue = {
            ...value,
            ...pos,
            ...{ [styleKey]: styleData }
          };
        }
        if (styleKey === '__font__') {
          // __font__ 代表元素样式配置入口，避免和 font 原生属性重复
          const matched = fontOptions.find(
            option => option.value === styleData
          );
          nextValue = {
            ...omit(value, fontStyleProps),
            ...(matched?.defaultValue || {}),
            ...{ [styleKey]: styleData }
          };
        }
        if (styleKey === 'backgroundPosition') {
          nextValue = {
            ...value,
            backgroundPositionX: (styleData as string).split(',')[0],
            backgroundPositionY: (styleData as string).split(',')[1]
          };
        }
        if (styleKey === 'backgroundType') {
          if (styleData === 'color') {
            nextValue = {
              ...pick(value, ['backgroundColor']),
              ...{ [styleKey]: styleData }
            };
          } else if (styleData === 'image') {
            nextValue = {
              ...pick(value, backgroundStyleProps),
              ...{ [styleKey]: styleData }
            };
          }
        }
        if (styleKey === 'borderRadiusType') {
          nextValue = {
            ...omit(value, borderRadiusStyleProps),
            ...{ [styleKey]: styleData }
          };
        }
        if (styleKey === 'borderType') {
          nextValue = {
            ...omit(value, borderStyleProps),
            ...{ [styleKey]: styleData }
          };
        }
        console.log('nextValue', nextValue);
        onChange?.(nextValue);
      },
      [value, onChange]
    );

    return (
      <div className="rx-style-setter">
        <SizeSetter
          type="width"
          onChange={handleStyleChange}
          value={value?.width}
        />
        <SizeSetter
          type="height"
          onChange={handleStyleChange}
          value={value?.height}
        />
        <LayoutSetter onStyleChange={handleStyleChange} value={value} />
        <FontSetter onStyleChange={handleStyleChange} value={value} />
        <BackgroundSetter onStyleChange={handleStyleChange} value={value} />
        <BorderSetter onStyleChange={handleStyleChange} value={value} />
        <OpacitySetter
          onStyleChange={handleStyleChange}
          value={value?.opacity}
        />
      </div>
    );
  }
);
