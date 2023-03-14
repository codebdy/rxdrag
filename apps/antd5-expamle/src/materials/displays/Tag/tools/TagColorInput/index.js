import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "antd";
import { useToolsTranslate } from "core-react/hooks/useToolsTranslate";
import { memo, useCallback, useEffect, useState } from "react";
import { ColorInput } from "react-shells/ant5/SettingsForm/components/ColorInput";
import styled from "styled-components";
import { PredefinedColorInput } from "./PredefinedColorInput";
const Container = styled.div `
  display: flex;
`;
const SwitchButton = styled(Button) `
  margin-left: 2px;
`;
const predefinedColors = [
    'magenta',
    'red',
    'volcano',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'geekblue',
    'purple',
];
var ColorType;
(function (ColorType) {
    ColorType["Predefined"] = "predefined";
    ColorType["Customized"] = "customized";
})(ColorType || (ColorType = {}));
export const TagColorInput = memo((props) => {
    const { value, onChange } = props;
    const [colorType, setColorType] = useState();
    const t = useToolsTranslate();
    useEffect(() => {
        if (predefinedColors.find(color => color === value) || value === undefined) {
            setColorType(ColorType.Predefined);
        }
        else {
            setColorType(ColorType.Customized);
        }
    }, [value]);
    const handleClick = useCallback(() => {
        setColorType(type => type === ColorType.Customized ? ColorType.Predefined : ColorType.Customized);
    }, []);
    return (_jsxs(Container, { children: [colorType === ColorType.Customized
                ? _jsx(ColorInput, { value: value, onChange: onChange })
                : _jsx(PredefinedColorInput, { value: value, onChange: onChange, colors: predefinedColors }), _jsx(SwitchButton, { onClick: handleClick, children: t(colorType || "") })] }));
});
