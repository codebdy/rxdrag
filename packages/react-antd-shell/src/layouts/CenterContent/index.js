import { jsx as _jsx } from "react/jsx-runtime";
import { memo } from "react";
import cls from "classnames";
import "./style.less";
import { useStyles } from "../../hooks";
export const CenterContent = memo((props) => {
    const { className, children, style, ...other } = props;
    const styles = useStyles((token) => ({
        background: token.colorBorderSecondary
    }));
    return (_jsx("div", { className: cls(className, "rx-center-content"), style: { ...styles, ...style }, ...other, children: children }));
});
