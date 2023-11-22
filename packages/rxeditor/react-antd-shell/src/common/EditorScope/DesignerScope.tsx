import { memo, useMemo } from "react"
import { Designer } from "@rxdrag/react-core"
import { BackgroundImageInput, BackgroundPositionInput, BackgroundRepeatInput, BackgroundSizeInput, CheckboxGroup, ColInput, CollapsePanel, ColorInput, ControllerSetter, DisplaySetter, EffectsInput, EventInput, ExpressionInput, Fold, FoldBase, FoldExtra, FoldExtraItem, FontColorInput, FontDecorationSelect, FontLineHeightInput, FontSelect, FontSizeInput, FontStyleSelect, FontWeightInput, GutterInput, IconInput, ImageInput, JSONInput, TetradInput, PropLayout, SizeInput, SlotSwitch, StyleSetter, TabPanel, Tabs, TextAlignSelect, ValueInput, YupRulesInput, NameInput, XDataInput } from "@rxdrag/react-antd-props-inputs";
import { Checkbox, Input, InputNumber, Radio, Select, Slider, Space } from 'antd';
import { FormItem, Switch } from "@rxdrag/react-antd-components";
import { EditorScropProps } from "./EditorScropProps";
import { UrlsContext } from "../contexts";

export const DesignerScope = memo((
  props: EditorScropProps
) => {
  const { setters, canvasUrl, previewUrl, children, ...rest } = props;

  const urls = useMemo(() => ({ canvasUrl, previewUrl }), [canvasUrl, previewUrl])

  return (
    <UrlsContext.Provider value={urls}>
      <Designer
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
            TetradInput,
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
            EventInput,
            ValueInput,
            JSONInput,
            ExpressionInput,
            Space,
            StyleSetter,
            PropLayout,
            XDataInput,
            YupRulesInput,
            ControllerSetter,
            NameInput,
            ...setters,
          }
        }
        {...rest}
      >
        {children}
      </Designer>
    </UrlsContext.Provider>
  )
})