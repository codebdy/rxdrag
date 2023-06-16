import { memo, useCallback } from 'react';

import {
  SizeSetter,
  LayoutSetter,
  FontSetter,
  BackgroundSetter,
  BorderSetter
} from './setters';
import { StyleChangeListener, StyleData } from './types';

export const StyleSetter = memo(
  (props: { value?: any; onChange?: (value?: any) => void }) => {
    const { onChange, value } = props;

    const handleStyleChange: StyleChangeListener = useCallback(
      (styleKey: string, styleData: StyleData) => {
        let nextValue = { ...value, ...{ [styleKey]: styleData } };

        console.log('nextValue', nextValue);
        console.log('===onChange===', onChange);
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
      </div>
    );
  }
);
