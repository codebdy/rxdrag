import { memo, useState } from "react"
import styled from "styled-components"
import { NavType, LeftSide } from "../LeftSide"
import { DeviceType, ThemeMode } from "../interfaces"
import { ModuleUiDesigner } from "./ModuleUiDesigner"

//设备端的编辑区
const AppDeviceArea = styled.div`
    flex:1;
    display: flex;
    height: 0;
  `

export const UiDesigner = memo((
  props: {
    device: DeviceType,
    canvasUrl: string,
    previewUrl: string,
    themeMode?: ThemeMode,
  }
) => {
  const { device, canvasUrl, previewUrl, themeMode } = props;
  const [navKey, setNavKey] = useState<NavType>(NavType.moudules)

  return (
    <AppDeviceArea>
      <LeftSide
        navKey={navKey}
        onNavKeyChange={setNavKey}
      />
      <ModuleUiDesigner
        device={device}
        canvasUrl={canvasUrl}
        previewUrl={previewUrl}
        themeMode={themeMode}
      />
    </AppDeviceArea>
  )
})