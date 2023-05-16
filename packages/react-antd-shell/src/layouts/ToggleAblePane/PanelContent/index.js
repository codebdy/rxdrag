import { jsx as _jsx } from "react/jsx-runtime";
import { memo } from "react";
import "./style.less";
import cls from "classnames";
export const PanelContent = memo((props) => {
    const { style, className, children } = props;
    return (_jsx("div", { style: style, className: cls("rx-toggle-pane-conent", className), children: children }));
});
