import { CSSProperties, memo, useCallback, useMemo } from "react"
import { Checkbox, Form, Input, InputNumber, Radio, Select, Slider, Space, Switch } from 'antd';
import { useDesignerEngine, useCurrentNode, useChangeNodeMeta, useLanguage, useDesignComponentsParams } from "@rxdrag/react-core";
import { Fieldy, VirtualForm } from "@rxdrag/react-fieldy";
import { ComponentRender } from "@rxdrag/react-runner";
import { INodeMeta } from "@rxdrag/schema";
import { BackgroundImageInput, BackgroundPositionInput, BackgroundRepeatInput, BackgroundSizeInput,  CheckboxGroup, ColInput, CollapsePanel, ColorInput, DisplaySetter, EffectsInput, EventInput, ExpressionInput, Fold, FoldBase, FoldExtra, FoldExtraItem, FontColorInput, FontDecorationSelect, FontLineHeightInput, FontSelect, FontSizeInput, FontStyleSelect, FontWeightInput, GutterInput, IconInput, ImageInput, JSONInput, MarginStyleSetter, PaddingStyleSetter, SizeInput, SlotSwitch, StyleSetter, TabPanel, Tabs, TextAlignSelect, ValueInput } from "@rxdrag/react-antd-props-inputs";
import { ControllerSetter } from "./components";
import { FormValue } from "@rxdrag/fieldy"

const propertiesStyle: CSSProperties = {
  flex: 1,
  height: 0,
  width: "100%",
}

export const SettingsForm = memo(() => {
  const engine = useDesignerEngine()
  const currentNode = useCurrentNode()
  const changeMeta = useChangeNodeMeta()
  const lang = useLanguage()
  const { tools } = useDesignComponentsParams()

  const propsSchema = useMemo(() => {
    if (currentNode && currentNode.propsSchema) {
      //翻译
      return engine?.getLoacalesManager()
        .translateDesignerSchema(currentNode?.meta.componentName,
          JSON.parse(JSON.stringify(currentNode.propsSchema))
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
    <Fieldy>
      <div style={propertiesStyle}>
        {
          currentNode &&
          <VirtualForm
            initialValue={currentNode?.meta as unknown as FormValue | undefined}
            onValueChange={handleMetaChange as unknown as (value: FormValue | undefined) => void}
            //key={currentNode.id}
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
                propsSchema &&
                <ComponentRender
                  root={propsSchema}
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
                    ...tools,
                  }}
                  localesManager={engine?.getLoacalesManager()}
                />
              }
            </Form>
          </VirtualForm>
        }
      </div>
    </Fieldy>

  )
})