import { RadioField } from '../../components';
import { layoutConfig } from './config';

// 布局配置信息
const { display, flexDirection, justifyContent, alignItems, flexWrap } =
  layoutConfig;

export const Display = props => {
  const { onChange, value } = props;

  return (
    <>
      <RadioField
        options={display.options}
        styleKey="display"
        label={display.title}
        onChange={onChange}
        value={value?.['display']}
      />
      {value?.display === 'flex' && (
        <>
          <RadioField
            options={flexDirection.options}
            styleKey="flexDirection"
            label={flexDirection.title}
            onChange={onChange}
            value={value?.['flexDirection']}
          />
          <RadioField
            options={justifyContent.options}
            styleKey="justifyContent"
            label={justifyContent.title}
            onChange={onChange}
            value={value?.['justifyContent']}
          />
          <RadioField
            options={alignItems.options}
            styleKey="alignItems"
            label={alignItems.title}
            onChange={onChange}
            value={value?.['alignItems']}
          />
          <RadioField
            options={flexWrap.options}
            styleKey="flexWrap"
            label={flexWrap.title}
            onChange={onChange}
            value={value?.['flexWrap']}
          />
        </>
      )}
      <div className="ts-field-split-line"></div>
    </>
  );
};
