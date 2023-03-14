import { jsx as _jsx } from "react/jsx-runtime";
import { Statistic as AntdStatistic } from "antd";
import { forwardRef, memo } from "react";
import { IconView } from "react-shells/ant5/components/IconView";
export const Statistic = memo(forwardRef((props, ref) => {
    const { prefix, ...other } = props;
    return (_jsx("div", { ref: ref, children: _jsx(AntdStatistic, { prefix: prefix && _jsx(IconView, { icon: prefix }), ...other }) }));
}));
