import React from "react";

export const SvgStringIcon = React.forwardRef((
  props: {
    icon?: string,
    size?: number,
  },
  ref: any
) => {
  const { icon, size = 24, ...rest } = props;

  return (
    <div
      style={{
        width: size,
        height: size,
      }}
      {...rest}
      ref={ref}
      dangerouslySetInnerHTML={{
        __html: icon
      }}
    >
    </div>
  )
})