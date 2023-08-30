import { memo } from "react"
import { IComponentMaterial, IMinionOptions } from "@rxdrag/react-core"
import { Antd5EditorInnerProps, RxEditorAntdInner } from "./RxEditorAntdInner"
import { ReactComponent } from "@rxdrag/react-shared"
import { ISetterComponents } from "@rxdrag/core"
import { EditorScope, EditorTheme } from "../common"
import { ConfigRoot } from "../common/EditorTheme/ConfigRoot"
import "./style.css"

export type Antd5EditorProps = Antd5EditorInnerProps & {
  themeMode?: "dark" | "light",
  //逻辑编排配置项
  minionOptions?: IMinionOptions,
  materials?: IComponentMaterial[],
  setters?: ISetterComponents<ReactComponent>
}

export const RxEditorAntd = memo((props: Antd5EditorProps) => {
  const { themeMode, minionOptions, materials, setters, ...rest } = props;

  return (
    <EditorScope
      minionOptions={minionOptions}
      themeMode={themeMode}
      materials={materials}
      setters={setters}
    >
      <ConfigRoot>
        <EditorTheme>
          <RxEditorAntdInner {...rest} />
        </EditorTheme>
      </ConfigRoot>
    </EditorScope>
  )
})
