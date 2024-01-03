import { memo } from "react"
import { IMaterial } from "@rxdrag/react-core"
import { Antd5EditorInnerProps, RxEditorAntdInner } from "./RxEditorAntdInner"
import { ReactComponent } from "@rxdrag/react-shared"
import { ISetterComponents } from "@rxdrag/core"
import { DesignerScope, EditorTheme } from "../common"
import { ConfigRoot } from "../common/EditorTheme/ConfigRoot"
import "./style.css"

export type Antd5EditorProps = Antd5EditorInnerProps & {
  themeMode?: "dark" | "light",
  //逻辑编排配置项
  //minionOptions?: IMinionOptions,
  materials?: IMaterial[],
  setters?: ISetterComponents<ReactComponent>,
  canvasUrl: string,
  previewUrl: string,
}

export const RxEditorAntd = memo((props: Antd5EditorProps) => {
  const { themeMode,  materials, setters, canvasUrl,  previewUrl, ...rest } = props;

  return (
    <DesignerScope
      //minionOptions={minionOptions}
      themeMode={themeMode}
      materials={materials}
      setters={setters}
      canvasUrl = {canvasUrl}
      previewUrl = {previewUrl}
    >
      <ConfigRoot>
        <EditorTheme>
          <RxEditorAntdInner {...rest} />
        </EditorTheme>
      </ConfigRoot>
    </DesignerScope>
  )
})
