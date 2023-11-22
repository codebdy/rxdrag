import { useCallback, useMemo } from 'react';
import { Radio, Tooltip } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { Field } from '../Field';
import { RadioItem } from '../../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const RadioField = (props:any) => {
  const { styleKey, options, label, onChange, value, defaultValue, ...others } =
    props;

  const buildOptions = useCallback((options: RadioItem[]) => {
    return options.map(d => ({
      label: (
        <Tooltip title={d.tips}>
          {d.icon ? <>{d.icon}</> : <>{d.label || ''}</>}
        </Tooltip>
      ),
      value: d.value
    }));
  }, []);

  const radioOptions = useMemo(
    () => buildOptions(options),
    [buildOptions, options]
  );

  const handleChange = useCallback(
    ({ target: { value } }: RadioChangeEvent) => {
      onChange && onChange(styleKey, value);
    },
    [styleKey, onChange]
  );

  return (
    <Field
      label={label}
      underline={false}
      extra={
        <Radio.Group
          options={radioOptions}
          optionType="button"
          onChange={handleChange}
          value={value}
          defaultValue={defaultValue}
          {...others}
        />
      }
    ></Field>
  );
};
