import { LayoutBox } from '../../components';
import { StyleChangeListener } from '../../types';
import { Display } from './Display';

export const LayoutSetter = (props: {
  onStyleChange?: StyleChangeListener;
  value?: any;
}) => {
  const { onStyleChange, value } = props;

  const onChange: StyleChangeListener = (styleKey, value) => {
    onStyleChange && onStyleChange(styleKey, value);
  };

  return (
    <div className="layout-style-container">
      <Display onChange={onChange} value={value} />
      <LayoutBox type="margin" onChange={onChange} value={value} />
      <LayoutBox type="padding" onChange={onChange} value={value} />
    </div>
  );
};
