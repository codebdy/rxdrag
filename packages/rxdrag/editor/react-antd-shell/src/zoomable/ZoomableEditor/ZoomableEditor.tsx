import { memo } from "react"
import { ZoomableEditorInner, ZoomableEditorInnerProps } from "./ZoomableEditorInner"
import { ReactComponent } from "@rxdrag/react-shared"
import { Designer, IComponentMaterial, IMinionOptions } from "@rxdrag/react-core"
import { BackgroundImageInput, BackgroundPositionInput, BackgroundRepeatInput, BackgroundSizeInput, CheckboxGroup, ColInput, CollapsePanel, ColorInput, DisplaySetter, EffectsInput, EventInput, ExpressionInput, Fold, FoldBase, FoldExtra, FoldExtraItem, FontColorInput, FontDecorationSelect, FontLineHeightInput, FontSelect, FontSizeInput, FontStyleSelect, FontWeightInput, GutterInput, IconInput, ImageInput, JSONInput, MarginStyleSetter, PaddingStyleSetter, PropLayout, SizeInput, SlotSwitch, StyleSetter, TabPanel, Tabs, TextAlignSelect, ValueInput, YupRulesInput } from "@rxdrag/react-antd-props-inputs";
import { Checkbox, Input, InputNumber, Radio, Select, Slider, Space } from 'antd';
import { FormItem, Switch } from "@rxdrag/react-antd-components";
import { ISetterComponents } from "@rxdrag/core"
import { ControllerSetter } from "../../common";
import { EditorTheme } from "../../common/EditorTheme";
import "./style.css"
import { ConfigRoot } from "../../common/EditorTheme/ConfigRoot";
import { ZoomableRoot } from "../ZoomableRoot";
import { ILocales } from "@rxdrag/locales";

export type ZoomableEditorProps = ZoomableEditorInnerProps & {
  themeMode?: "dark" | "light",
  //逻辑编排配置项
  minionOptions?: IMinionOptions,
  materials?: IComponentMaterial[],
  setters?: ISetterComponents<ReactComponent>
  locales?: ILocales,
}

export const ZoomableEditor = memo((props: ZoomableEditorProps) => {
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
        <EditorTheme>
          <ZoomableRoot>
            <ZoomableEditorInner {...rest} />
          </ZoomableRoot>
        </EditorTheme>
      </ConfigRoot>
    </Designer>
  )
})