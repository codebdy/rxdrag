import { Tabs, TabsProps } from "antd"
import { memo, useMemo } from "react"
import { ResourceWidget } from "../../../../ResourceWidget"
import { ResourceGroup } from "example-common"
import { ButtonMaterial, InputMaterial, TextAreaMaterial, InputNumberMaterial, AutoCompleteMaterial, SelectMaterial, CheckboxMaterial, DatePickerMaterial, DateRangePickerMaterial, MentionsMaterial, RadioMaterial, RateMaterial, SliderMaterial, SwitchMaterial, TimePickerMaterial, CascaderMaterial, TransferMaterial, TreeSelectMaterial, TitleMaterial, TextMaterial, LinkMaterial, IconViewMaterial, AvatarMaterial, BadgeMaterial, ImageViewMaterial, DropdownMaterial, DialogGroupMaterial, DrawerGroupMaterial, PopconfirmMaterial, PopoverMaterial, TooltipMaterial, HCFLayoutMaterial, TwoColumnLayoutMaterial, LogoMaterial, MenuMaterial, BoxMaterial, DividerMaterial, SpaceMaterial, ContainerMaterial } from "@rxdrag/react-antd-materials"
import { PageMaterial } from "../../materials/admin/Page"

export const resources: ResourceGroup[] = [
  {
    titleKey: 'layouts',
    items: [
      TwoColumnLayoutMaterial.componentName,
      HCFLayoutMaterial.componentName,
      LogoMaterial.componentName,
      MenuMaterial.componentName,
      BoxMaterial.componentName,
      DividerMaterial.componentName,
      SpaceMaterial.componentName,
      ContainerMaterial.componentName,
      PageMaterial.componentName,
    ]
  },
  {
    titleKey: 'inputs',
    items: [
      ButtonMaterial.componentName,
      InputMaterial.componentName,
      TextAreaMaterial.componentName,
      InputNumberMaterial.componentName,
      AutoCompleteMaterial.componentName,
      SelectMaterial.componentName,
      CheckboxMaterial.componentName,
      DatePickerMaterial.componentName,
      DateRangePickerMaterial.componentName,
      MentionsMaterial.componentName,
      RadioMaterial.componentName,
      RateMaterial.componentName,
      SliderMaterial.componentName,
      SwitchMaterial.componentName,
      TimePickerMaterial.componentName,
      CascaderMaterial.componentName,
      TransferMaterial.componentName,
      TreeSelectMaterial.componentName,
    ]
  },
  {
    titleKey: 'displays',
    items: [
      TitleMaterial.componentName,
      TextMaterial.componentName,
      LinkMaterial.componentName,
      IconViewMaterial.componentName,
      AvatarMaterial.componentName,
      BadgeMaterial.componentName,
      ImageViewMaterial.componentName,
    ]
  },
  {
    titleKey: 'popups',
    items: [
      DropdownMaterial.componentName,
      DialogGroupMaterial.componentName,
      DrawerGroupMaterial.componentName,
      PopconfirmMaterial.componentName,
      PopoverMaterial.componentName,
      TooltipMaterial.componentName,
    ]
  },


]

export const AdminFrameToolbox = memo(() => {

  const items: TabsProps['items'] = useMemo(() => {
    return [
      {
        label: "组件",
        key: "components",
        children: <ResourceWidget resources={resources} />
      },
      {
        label: "模板",
        key: "templates",
        children: "2方案/布局/组件"
      },
    ]
  }, [])
  return (
    <Tabs items={items} />
  )
})