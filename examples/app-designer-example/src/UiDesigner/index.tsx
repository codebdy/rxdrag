import { memo, useState } from "react"
import styled from "styled-components"
import { DeviceType, ThemeMode } from "../interfaces"
import { ModuleUiDesigner } from "./ModuleUiDesigner"
import { FrameUiDesigner } from "./FrameUiDesigner"
import { NavType, LeftSide } from "./LeftSide"

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
      {
        navKey === NavType.moudules && <ModuleUiDesigner
          device={device}
          canvasUrl={canvasUrl}
          previewUrl={previewUrl}
          themeMode={themeMode}
        />
      }
      {
        navKey === NavType.frame && <FrameUiDesigner
          device={device}
          canvasUrl={canvasUrl}
          previewUrl={previewUrl}
          themeMode={themeMode}
        />
      }

    </AppDeviceArea>
  )
})