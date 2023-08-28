import { memo } from "react"
import "./style.css"
import { Designer, IComponentMaterial, IMinionOptions } from "@rxdrag/react-core"
import { Antd5EditorInnerProps, RxEditorAntdInner } from "./RxEditorAntdInner"
import { ReactComponent } from "@rxdrag/react-shared"
import { BackgroundImageInput, BackgroundPositionInput, BackgroundRepeatInput, BackgroundSizeInput, CheckboxGroup, ColInput, CollapsePanel, ColorInput, DisplaySetter, EffectsInput, EventInput, ExpressionInput, Fold, FoldBase, FoldExtra, FoldExtraItem, FontColorInput, FontDecorationSelect, FontLineHeightInput, FontSelect, FontSizeInput, FontStyleSelect, FontWeightInput, GutterInput, IconInput, ImageInput, JSONInput, MarginStyleSetter, PaddingStyleSetter, PropLayout, SizeInput, SlotSwitch, StyleSetter, TabPanel, Tabs, TextAlignSelect, ValueInput, YupRulesInput } from "@rxdrag/react-antd-props-inputs";
import { Checkbox, Input, InputNumber, Radio, Select, Slider, Space } from 'antd';
import { FormItem, Switch } from "@rxdrag/react-antd-components";
import { ISetterComponents } from "@rxdrag/core"
import { ConfigRoot } from "./panels/EditorContainer/ConfigRoot"
import { ControllerSetter } from "../common"

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
    <Designer
      minionOptions={minionOptions}
      themeMode={themeMode}
      materials={materials}
      setters={
        {
          Tabs,
          TabPanel,
          FormItem: FormItem,
          Input,
          TextArea: Input.TextArea,
          Select,
          Switch,
          SlotSwitch,
          Fold,
          FoldBase,
          FoldExtra,
          FoldExtraItem,
          Radio,
          Slider,
          InputNumber,
          ColorInput,
          SizeInput,
          FontSelect,
          FontColorInput,
          FontDecorationSelect,
          FontSizeInput,
          FontLineHeightInput,
          FontStyleSelect,
          FontWeightInput,
          TextAlignSelect,
          MarginStyleSetter,
          PaddingStyleSetter,
          DisplaySetter,
          IconInput,
          GutterInput,
          "Radio.Group": Radio.Group,
          "Checkbox.Group": Checkbox.Group,
          Checkbox: Checkbox,
          CheckboxGroup: CheckboxGroup,
          ColInput,
          BackgroundImageInput,
          BackgroundSizeInput,
          BackgroundRepeatInput,
          BackgroundPositionInput,
          ImageInput,
          CollapsePanel,
          EffectsInput,
          ControllerSetter,
          EventInput,
          ValueInput,
          JSONInput,
          ExpressionInput,
          Space,
          StyleSetter,
          PropLayout,
          YupRulesInput,
          ...setters,
        }
      }
    >
      <ConfigRoot>
        <RxEditorAntdInner {...rest} />
      </ConfigRoot>
    </Designer>
  )
})
