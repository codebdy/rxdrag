import { useMemo, useCallback } from 'react';
import { Input, Button } from 'antd';
import type { Color } from 'antd/es/color-picker';
import {
  FieldGroup,
  Field,
  RadioField,
  ColorField,
  Positions
} from '../../components';
import {
  backgroundTypes,
  backgroundSizes,
  backgroundPositions,
  backgroundRepeats
} from './config';
import { cloudUploadIcon } from '../../../ImageInput';
import { ImageSelect } from '../../../ImageSelect';
import { SetterProps } from '../../types';
import { StyledBackgroundContainer } from './components';

type BackgroundType = 'color' | 'image';

export const BackgroundSetter = (props: SetterProps) => {
  const { onStyleChange, value } = props;

  const handleChange = useCallback(
    (key: string, value: any) => {
      let nextValue = value;
      if (key === 'backgroundPositionX' || key === 'backgroundPositionY') {
        nextValue = `${value}%`;
      }
      onStyleChange?.(key, nextValue);
    },
    [onStyleChange]
  );

  const backgroundType = useMemo(() => {
    return value?.['backgroundType'] ?? 'color';
  }, [value]);

  const handleBackgroundTypeChange = useCallback(
    (styleKey: string, value: BackgroundType) => {
      handleChange(styleKey, value);
    },
    [handleChange]
  );

  const handleColorChange = (styleKey: string, value: Color) => {
    handleChange(styleKey, value);
  };

  const handleBackgroundImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const backgroundImageUrl =
      event.target.value === '' ? undefined : `url(${event.target.value})`;
    return handleChange('backgroundImage', backgroundImageUrl);
  };

  const handleSelectChange = useCallback(
    (imageUrl?: string) => {
      handleChange?.('backgroundImage', `url(${imageUrl})`);
    },
    [handleChange]
  );

  return (
    <StyledBackgroundContainer className="background-style-container">
      <FieldGroup title="背景">
        <RadioField
          options={backgroundTypes.options}
          styleKey="backgroundType"
          label={backgroundTypes.title}
          onChange={handleBackgroundTypeChange}
          value={value?.['backgroundType']}
          defaultValue="color"
        />
        {backgroundType === 'color' && (
          <ColorField
            label=""
            type="backgroundColor"
            value={value?.['backgroundColor']}
            onChange={handleColorChange}
          />
        )}
        {backgroundType === 'image' && (
          <>
            <Field
              label=""
              underline={false}
              extra={
                <Input.Group compact>
                  <Input
                    style={{ width: 'calc(100% - 32px)' }}
                    placeholder="请输入图片 url"
                    value={value?.['backgroundImage']}
                    onChange={handleBackgroundImageChange}
                  />
                  <ImageSelect onChange={handleSelectChange}>
                    <Button icon={cloudUploadIcon}></Button>
                  </ImageSelect>
                </Input.Group>
              }
            />
            {value?.['backgroundImage'] && (
              <>
                <RadioField
                  options={backgroundSizes.options}
                  styleKey="backgroundSize"
                  label={backgroundSizes.title}
                  onChange={handleBackgroundTypeChange}
                  defaultValue="auto"
                  value={value?.['backgroundSize']}
                />
                <Field
                  label="定位"
                  extra={
                    <Positions
                      value={value}
                      options={backgroundPositions.options}
                      onChange={handleChange}
                    />
                  }
                />
                <RadioField
                  options={backgroundRepeats.options}
                  styleKey="backgroundRepeat"
                  label={backgroundRepeats.title}
                  onChange={handleBackgroundTypeChange}
                  defaultValue="no-repeat"
                  value={value?.['backgroundRepeat']}
                />
              </>
            )}
          </>
        )}
      </FieldGroup>
    </StyledBackgroundContainer>
  );
};
