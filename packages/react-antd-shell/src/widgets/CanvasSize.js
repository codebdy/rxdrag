import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Space, Tooltip } from "antd";
import { memo, useCallback, useEffect, useState } from "react";
import { SvgIcon } from "../layouts/CanvasToolbar/SvgIcon";
import { SlScreenDesktop, SlScreenTablet } from "react-icons/sl";
import { useCanvasWidthLimitsState, useToolsTranslate } from "@rxdrag/react-core";
import { mobileIcon, responsiveIcon } from "@rxdrag/react-shared";
export var ScreenType;
(function (ScreenType) {
    ScreenType["Desktop"] = "desktop";
    ScreenType["Tablet"] = "tablet";
    ScreenType["MobileLandscape"] = "mobileLandscape";
    ScreenType["MobilePortrait"] = "mobilePortrait";
    ScreenType["Responsive"] = "responsive";
})(ScreenType || (ScreenType = {}));
const desktopLimits = {
    minWidth: 992
};
const tabletLimits = {
    minWidth: 768,
    maxWidth: 991
};
const mobileLandscapeLimits = {
    minWidth: 576,
    maxWidth: 767
};
const mobilePortraitLimits = {
    minWidth: 480,
    maxWidth: 575
};
const ALL_LIMITS = {
    [ScreenType.Desktop]: desktopLimits,
    [ScreenType.Tablet]: tabletLimits,
    [ScreenType.MobileLandscape]: mobileLandscapeLimits,
    [ScreenType.MobilePortrait]: mobilePortraitLimits,
};
export const CanvasSize = memo(() => {
    const [screenType, setScreenType] = useState(ScreenType.Desktop);
    const [, setLimits] = useCanvasWidthLimitsState();
    const t = useToolsTranslate();
    useEffect(() => {
        setLimits(ALL_LIMITS[screenType || ScreenType.Desktop] || null);
    }, [screenType, setLimits]);
    const handleDesktop = useCallback(() => {
        setScreenType(ScreenType.Desktop);
    }, []);
    const handleTablet = useCallback(() => {
        setScreenType(ScreenType.Tablet);
    }, []);
    const handleMobileLandscape = useCallback(() => {
        setScreenType(ScreenType.MobileLandscape);
    }, []);
    const handleMobilePortait = useCallback(() => {
        setScreenType(ScreenType.MobilePortrait);
    }, []);
    const handleResponsive = useCallback(() => {
        setScreenType(ScreenType.Responsive);
    }, []);
    return (_jsxs(Space, { children: [_jsx(Tooltip, { title: t("desktop"), children: _jsx(Button, { size: "small", type: screenType === ScreenType.Desktop ? "default" : "text", icon: _jsx(SvgIcon, { children: _jsx(SlScreenDesktop, { size: 16 }) }), onClick: handleDesktop }) }), _jsx(Tooltip, { title: t("tablet"), children: _jsx(Button, { size: "small", type: screenType === ScreenType.Tablet ? "default" : "text", icon: _jsx(SvgIcon, { children: _jsx(SlScreenTablet, { size: 14 }) }), onClick: handleTablet }) }), _jsx(Tooltip, { title: t("mobileLandscape"), children: _jsx(Button, { size: "small", type: screenType === ScreenType.MobileLandscape ? "default" : "text", icon: _jsx(SvgIcon, { style: { transform: "rotate(-90deg)" }, children: mobileIcon }), onClick: handleMobileLandscape }) }), _jsx(Tooltip, { title: t("mobilePortrait"), children: _jsx(Button, { size: "small", type: screenType === ScreenType.MobilePortrait ? "default" : "text", icon: _jsx(SvgIcon, { children: mobileIcon }), onClick: handleMobilePortait }) }), _jsx(Tooltip, { title: t("responsive"), children: _jsx(Button, { size: "small", type: screenType === ScreenType.Responsive ? "default" : "text", icon: _jsx(SvgIcon, { children: responsiveIcon }), onClick: handleResponsive }) })] }));
});
