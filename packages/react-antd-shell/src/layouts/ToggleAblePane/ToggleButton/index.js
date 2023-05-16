import { jsx as _jsx } from "react/jsx-runtime";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "./style.less";
import cls from "classnames";
import { useStyles } from "../../../hooks";
export var ToggleType;
(function (ToggleType) {
    ToggleType["left"] = "left";
    ToggleType["right"] = "right";
})(ToggleType || (ToggleType = {}));
export const ToggleButton = (props) => {
    const { toggleType, toggled, onClick } = props;
    const styles = useStyles((token) => ({
        borderColor: token.colorBorder,
        backgroundColor: token.colorBgBase,
        color: token.colorText,
    }));
    const rightIcon = toggleType === ToggleType.left ? _jsx(RightOutlined, {}) : _jsx(LeftOutlined, {});
    const lefIcon = toggleType !== ToggleType.left ? _jsx(RightOutlined, {}) : _jsx(LeftOutlined, {});
    const typeClass = toggleType === ToggleType.left ? "left-style" : "right-style";
    return (_jsx("div", { className: cls("toggle-button", typeClass), style: styles, onClick: onClick, children: toggled
            ? rightIcon
            : lefIcon }));
};
