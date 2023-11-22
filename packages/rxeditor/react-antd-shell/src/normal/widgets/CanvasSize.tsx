import { Button, Space, Tooltip } from "antd"
import { memo, useCallback, useEffect, useState } from "react"
import { SvgIcon } from "../../common/SvgIcon"
import { SlScreenDesktop, SlScreenTablet } from "react-icons/sl";
import { CanvasWidthLimits } from "@rxdrag/core";
import { useCanvasWidthLimitsState, useSettersTranslate } from "@rxdrag/react-core";
import { mobileIcon, responsiveIcon } from "@rxdrag/react-shared";

export enum ScreenType {
  Desktop = "desktop",
  Tablet = "tablet",
  MobileLandscape = "mobileLandscape",
  MobilePortrait = "mobilePortrait",
  Responsive = "responsive"
}

const desktopLimits: CanvasWidthLimits = {
  minWidth: 992
}

const tabletLimits: CanvasWidthLimits = {
  minWidth: 768,
  maxWidth: 991
}

const mobileLandscapeLimits: CanvasWidthLimits = {
  minWidth: 576,
  maxWidth: 767
}

const mobilePortraitLimits: CanvasWidthLimits = {
  minWidth: 480,
  maxWidth: 575
}

const ALL_LIMITS: {
  [key: string]: CanvasWidthLimits | undefined
} = {
  [ScreenType.Desktop]: desktopLimits,
  [ScreenType.Tablet]: tabletLimits,
  [ScreenType.MobileLandscape]: mobileLandscapeLimits,
  [ScreenType.MobilePortrait]: mobilePortraitLimits,
}

export const CanvasSize = memo(() => {
  const [screenType, setScreenType] = useState<ScreenType>(ScreenType.Desktop)
  const [, setLimits] = useCanvasWidthLimitsState()
  const t = useSettersTranslate()

  useEffect(() => {
    setLimits(ALL_LIMITS[screenType || ScreenType.Desktop] || null)
  }, [screenType, setLimits])

  const handleDesktop = useCallback(() => {
    setScreenType(ScreenType.Desktop)
  }, [])

  const handleTablet = useCallback(() => {
    setScreenType(ScreenType.Tablet)
  }, [])

  const handleMobileLandscape = useCallback(() => {
    setScreenType(ScreenType.MobileLandscape)
  }, [])

  const handleMobilePortait = useCallback(() => {
    setScreenType(ScreenType.MobilePortrait)
  }, [])

  const handleResponsive = useCallback(() => {
    setScreenType(ScreenType.Responsive)
  }, [])

  return (
    <Space>
      <Tooltip title={t("desktop")}>
        <Button
          size="small"
          type={screenType === ScreenType.Desktop ? "default" : "text"}
          icon={<SvgIcon><SlScreenDesktop size={16} /></SvgIcon>}
          onClick={handleDesktop}
        />
      </Tooltip>
      <Tooltip title={t("tablet")}>
        <Button
          size="small"
          type={screenType === ScreenType.Tablet ? "default" : "text"}
          icon={
            <SvgIcon>
              <SlScreenTablet size={14} />
            </SvgIcon>
          }
          onClick={handleTablet}
        />
      </Tooltip>
      <Tooltip title={t("mobileLandscape")}>
        <Button
          size="small"
          type={screenType === ScreenType.MobileLandscape ? "default" : "text"}
          icon={
            <SvgIcon style={{ transform: "rotate(-90deg)" }}>
              {mobileIcon}
            </SvgIcon>
          }
          onClick={handleMobileLandscape}
        />
      </Tooltip>
      <Tooltip title={t("mobilePortrait")}>
        <Button
          size="small"
          type={screenType === ScreenType.MobilePortrait ? "default" : "text"}
          icon={
            <SvgIcon>
              {mobileIcon}
            </SvgIcon>
          }
          onClick={handleMobilePortait}
        />
      </Tooltip>
      <Tooltip title={t("responsive")}>
        <Button
          size="small"
          type={screenType === ScreenType.Responsive ? "default" : "text"}
          icon={
            <SvgIcon>
              {responsiveIcon}
            </SvgIcon>
          }
          onClick={handleResponsive}
        />
      </Tooltip>
      {/* <div style={{ display: "flex", alignItems: "center" }}>
        <Typography.Text style={{ fontSize: 12, marginLeft: 8, marginRight: 4 }} >{t("min")}</Typography.Text>
        <Input size="small" style={{ width: 50 }} />
        <Typography.Text style={{ fontSize: 12, marginLeft: 8, marginRight: 4 }} >{t("max")}</Typography.Text>
        <Input size="small" style={{ width: 50 }} />
      </div> */}
    </Space>
  )
})

