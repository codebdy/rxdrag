import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef, memo } from "react";
import { Typography as AntdTypography } from "antd";
import { useFormat } from "../hooks/useFormat";
import { TypographyType } from "../types";
export const Paragraph = memo(forwardRef((props, ref) => {
    const { value, textType = TypographyType.Text, formatMask, ...other } = props;
    const text = useFormat(value, textType, formatMask);
    return (_jsx(AntdTypography.Paragraph, { ref: ref, ...other, children: text }));
}));
