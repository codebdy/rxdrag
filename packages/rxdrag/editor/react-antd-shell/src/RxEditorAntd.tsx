import { memo } from "react"
import { ConfigRoot } from "./panels/ShellContainer/ConfigRoot"
import "./style.less"
import { Designer, IComponentMaterial } from "@rxdrag/react-core"
import { IMinionOptions, MinionOptionContext } from "./contexts"
import { Antd5EditorInnerProps, RxEditorAntdInner } from "./RxEditorAntdInner"

export type Antd5EditorProps = Antd5EditorInnerProps & {
  themeMode?: "dark" | "light",
  //逻辑编排配置项
  minionOptions?: IMinionOptions,
  materials?: IComponentMaterial[],
}

export const RxEditorAntd = memo((props: Antd5EditorProps) => {
  const { themeMode, minionOptions, materials, ...rest } = props;

  return (
    <MinionOptionContext.Provider value={minionOptions}>
      <Designer
        themeMode={themeMode}
        materials={materials}
      >
        <ConfigRoot>
          <RxEditorAntdInner {...rest} />
        </ConfigRoot>
      </Designer>
    </MinionOptionContext.Provider>
  )
})
