import { jsx as _jsx } from "react/jsx-runtime";
import { memo } from "react";
import { useStyles } from "../../hooks/useStyles";
import cls from "classnames";
import "./style.less";
export const CanvasToolbar = memo((props) => {
    const { className, style, children, ...other } = props;
    const styles = useStyles((token) => ({
        borderBottom: `${token.colorBorder} solid 1px`,
    }));
    return (_jsx("div", { className: cls("rx-canvas-toolbar", className), style: { ...styles, ...style }, ...other, children: children }));
});
