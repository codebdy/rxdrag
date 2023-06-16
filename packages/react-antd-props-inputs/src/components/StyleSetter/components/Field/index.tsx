import { useMemo } from 'react';
import cx from 'classnames';

export const Field = props => {
  const {
    label,
    children,
    size = 'middle',
    className,
    style,
    extra,
    underline = false,
    contentStyle = {}
  } = props;

  const klassName = useMemo(
    () => cx(`rx-field rx-field-${size}`, className),
    [size, className]
  );

  return (
    <div className={klassName} style={style}>
      <div className="rx-field-head">
        <div className="rx-field-title">{label}</div>
        <div className="rx-field-content" style={contentStyle}>
          {extra}
        </div>
      </div>
      <div className="rx-field-body">{children}</div>
      {underline && <div className="rx-field-split-line"></div>}
    </div>
  );
};
