import { CSSProperties, memo, useCallback, useMemo } from "react"
import { useCurrentNode } from "core-react/hooks/useCurrentNode"
import { Checkbox, Form, Input, InputNumber, Radio, Select, Slider, Switch } from 'antd';
import { Tabs } from "./components/Tabs";
import { TabPanel } from "./components/Tabs/TabPanel";
import { INodeMeta } from "core";
import { Fieldy, VirtualForm } from "runner/fieldy";
import { useDesignerEngine } from "core-react/hooks";
import { Box } from "../components/Box";
import { PreviewRoot } from "core-react/PreviewRoot";
import { useChangeNodeMeta } from "core-react/hooks/useChangeNodeMeta";
import { SlotSwitch } from "./components/SlotSwitch";
import { useLanguage } from "core-react/hooks/useLanguage";
import { Fold, FoldBase, FoldExtra } from "./components/Fold";
import { FoldExtraItem } from "./components/Fold/FoldExtraItem";
import { FontSelect } from "./components/font/FontSelect";
import { ColorInput } from "./components/ColorInput";
import { SizeInput } from "./components/SizeInput";
import { FontColorInput } from "./components/font/FontColorInput";
import { FontDecorationSelect } from "./components/font/FontDecorationSelect";
import { FontLineHeightInput } from "./components/font/FontLineHeightInput";
import { FontStyleSelect } from "./components/font/FontStyleSelect";
import { FontWeightInput } from "./components/font/FontWeightInput";
import { TextAlignSelect } from "./components/font/TextAlignSelect";
import { FontSizeInput } from "./components/font/FontSizeInput";
import { MarginStyleSetter } from "./components/margin";
import { PaddingStyleSetter } from "./components/padding";
import { BorderRadiusSetter } from "./components/border/radius";
import { BorderSetter } from "./components/border";
import { DisplaySetter } from "./components/DisplaySetter";
import IconInput from "./components/IconInput";
import { GutterInput } from "./components/GutterInput";
import { ColInput } from "./components/ColInput";
import { BackgroundImageInput, BackgroundPositionInput, BackgroundRepeatInput, BackgroundSizeInput } from "./components/BackgroundImageInput";
import { ImageInput } from "./components/ImageInput";
import { ComponentRender } from "runner/ComponentRender";
import { CollapsePanel } from "./components/CollapsePanel";
import { EffectsInput } from "./components/EffectsInput";
import { ReactionsInput } from "./components/ReactionsInput";
import { EventInput } from "./components/EventInput";
import { ValueInput } from "./components/ValueInput";
import { JSONInput } from "./components/JSONInput";
import { CheckboxGroup } from "./components/CheckboxGroup";
import { useDesignComponentsParams } from "core-react/hooks/useDesignComponentsParams";

const propertiesStyle: CSSProperties = {
  flex: 1,
  height: 0,
  width: "100%",
}

export interface SettingsFormProps {
  //children?: React.ReactNode
}

export const SettingsForm = memo((props: SettingsFormProps) => {
  const engine = useDesignerEngine()
  const currentNode = useCurrentNode()
  const changeMeta = useChangeNodeMeta()
  const lang = useLanguage()
  const { tools } = useDesignComponentsParams()

  const designerSchema = useMemo(() => {
    if (currentNode && currentNode.designerSchema) {
      //翻译
      return engine?.getLoacalesManager()
        .translateDesignerSchema(currentNode?.meta.componentName,
          JSON.parse(JSON.stringify(currentNode.designerSchema))
        )
    } else {
      return undefined
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentNode, engine, lang])

  const handleMetaChange = useCallback((meta: INodeMeta) => {
    if (currentNode) {
      changeMeta(currentNode.id, meta)
    }
  }, [changeMeta, currentNode])

  return (
    <PreviewRoot
      components={{
        Tabs,
        TabPanel,
        FormItem: Form.Item,
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
        BorderRadiusSetter,
        BorderSetter,
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
        ReactionsInput,
        EventInput,
        ValueInput,
        JSONInput,
        ...tools,
      }}
    >
      <Fieldy>
        <Box style={propertiesStyle} {...props}>
          {
            currentNode &&
            <VirtualForm
              initialValue={currentNode?.meta}
              onValueChange={handleMetaChange}
              key={currentNode.id}
            >
              <Form
                labelAlign="left"
                colon={false}
                labelCol={{ span: 7 }}
                wrapperCol={{ span: 17 }}
                autoComplete="off"
                labelWrap={true}
                style={{
                  flex: 1,
                  height: '100%',
                }}
              >
                {
                  designerSchema &&
                  <ComponentRender
                    root={designerSchema}
                  />
                }
              </Form>
            </VirtualForm>
          }
        </Box>
      </Fieldy>
    </PreviewRoot>
  )
})