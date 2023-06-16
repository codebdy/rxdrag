import { useCallback } from 'react';
import { Row, Col, Tooltip } from 'antd';

import { FoldIcon } from '../../../Fold';
import {
  FieldGroup,
  Field,
  RadioField,
  UnitField,
  defaultUnits
} from '../../components';
import { Border } from './Border';
import { borderTypes, borderRadiusFragments } from './config';
import { StyleData, SetterProps } from '../../types';
import { StyledContainer } from './components';

export type BorderType = 'fixedBorder' | 'partBorder';

// radius 只需要 px, %
const units = defaultUnits.filter(d => d.value !== 'auto');

export const BorderSetter = (props: SetterProps) => {
  const { onStyleChange, value } = props;

  const handleChange = useCallback(
    (key: string, value: StyleData) => {
      onStyleChange?.(key, value);
    },
    [onStyleChange]
  );

  const handleBorderTypeChange = useCallback(
    (styleKey: string, value: BorderType) => {
      handleChange(styleKey, value);
    },
    [handleChange]
  );

  const handleRadiusChange = useCallback(
    (type: string, value: StyleData) => {
      handleChange(type, value);
    },
    [handleChange]
  );

  return (
    <StyledContainer className="border-style-container">
      <FieldGroup title="边框">
        <RadioField
          options={borderTypes.options}
          styleKey="borderRadiusType"
          label={borderTypes.title}
          onChange={handleBorderTypeChange}
          value={value?.['borderRadiusType']}
          defaultValue="color"
        />
        {value?.['borderRadiusType'] === 'fixedBorder' && (
          <UnitField
            label=""
            value={value?.['borderRadius']}
            units={units}
            type="borderRadius"
            onChange={handleRadiusChange}
            style={{ width: '160px' }}
          />
        )}
        {value?.['borderRadiusType'] === 'fragmentBorder' && (
          <Row justify="space-between" gutter={16}>
            {borderRadiusFragments.map(fragment => (
              <Col span={12}>
                <UnitField
                  label={
                    <Tooltip title={fragment.tips}>
                      <FoldIcon
                        style={{ fontSize: '20px', cursor: 'pointer' }}
                        icon={fragment.icon}
                      />
                    </Tooltip>
                  }
                  key={fragment.value}
                  value={value?.[fragment.value]}
                  units={units}
                  type={fragment.value}
                  onChange={handleRadiusChange}
                  style={{ width: '128px' }}
                />
              </Col>
            ))}
          </Row>
        )}
        <Field
          label="边框"
          className="rx-border-field"
          extra={<Border value={value} onChange={handleChange} />}
        />
      </FieldGroup>
    </StyledContainer>
  );
};
