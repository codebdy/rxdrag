import { IMaterial, Root } from "@rxdrag/react-core";
import { IResource } from "@rxdrag/core";
import { ButtonMaterial, InputMaterial, InputNumberMaterial, AutoCompleteMaterial, SelectMaterial, CheckboxMaterial, DatePickerMaterial, DateRangePickerMaterial, MentionsMaterial, RadioMaterial, SliderMaterial, SwitchMaterial, TimePickerMaterial, CascaderMaterial, TreeSelectMaterial, TitleMaterial, TextMaterial, LinkMaterial, ParagraphMaterial, IconViewMaterial, AvatarMaterial, BadgeMaterial, ImageViewMaterial, LoopPanelMaterial, TagMaterial, FormMaterial, FormItemMaterial, DropdownMaterial, DialogGroupMaterial, DrawerGroupMaterial, PopconfirmMaterial, PopoverMaterial, ListMaterial, ListItemMetaMaterial, TableMaterial, TableColumnMaterial, InputFieldResource, DefaultSlotMaterial, ActionSlotMaterial, ExtraSlotMaterial, StatisticMaterial, TooltipMaterial, TextAreaMaterial, RateMaterial, TransferMaterial, BoxMaterial, BreadcrumbMaterial, CardMaterial, ColMaterial, DividerMaterial, HCFLayoutMaterial, HeroMaterial, LogoMaterial, MenuMaterial, PaperMaterial, RowMaterial, SpaceMaterial, TwoColumnLayoutMaterial, InlineFormMaterial, DialogMaterial, ArrayPanelMaterial, FormLayoutMaterial, PageMaterial, DrawerMaterial, TreeListMaterial, TreeListItemMaterial, ObjectContainerMaterial } from "@rxdrag/react-antd-materials";
import { NewsMaterial } from "./business/News";
import { NoticesMaterial } from "./business/Notices";
import { RightAdMaterial } from "./business/RightAd";

export type ResourceGroup = {
  titleKey: string,
  items: string[]
}

export const materials: IMaterial[] = [
  {
    componentName: "Root",
    component: Root,
    designer: Root,
  },
  PageMaterial,
  ButtonMaterial,
  InputMaterial,
  TextAreaMaterial,
  InputNumberMaterial,
  AutoCompleteMaterial,
  SelectMaterial,
  CheckboxMaterial,
  DatePickerMaterial,
  DateRangePickerMaterial,
  MentionsMaterial,
  RadioMaterial,
  RateMaterial,
  SliderMaterial,
  SwitchMaterial,
  TimePickerMaterial,
  CascaderMaterial,
  TransferMaterial,
  TreeSelectMaterial,
  TitleMaterial,
  TextMaterial,
  LinkMaterial,
  ParagraphMaterial,
  StatisticMaterial,
  IconViewMaterial,
  AvatarMaterial,
  BadgeMaterial,
  ImageViewMaterial,
  LoopPanelMaterial,
  TagMaterial,
  FormMaterial,
  FormLayoutMaterial,
  InlineFormMaterial,
  FormItemMaterial,
  DropdownMaterial,
  DialogMaterial,
  DialogGroupMaterial,
  DrawerMaterial,
  DrawerGroupMaterial,
  PopconfirmMaterial,
  PopoverMaterial,
  TooltipMaterial,
  RowMaterial,
  ColMaterial,
  HCFLayoutMaterial,
  TwoColumnLayoutMaterial,
  LogoMaterial,
  MenuMaterial,
  CardMaterial,
  BoxMaterial,
  PaperMaterial,
  DividerMaterial,
  BreadcrumbMaterial,
  HeroMaterial,
  SpaceMaterial,
  ListMaterial,
  ListItemMetaMaterial,
  TableMaterial,
  TableColumnMaterial,
  ArrayPanelMaterial,
  TreeListMaterial,
  TreeListItemMaterial,
  RightAdMaterial,
  NewsMaterial,
  NoticesMaterial,
  //slots
  DefaultSlotMaterial,
  ActionSlotMaterial,
  ExtraSlotMaterial,
  ObjectContainerMaterial
]

export const resources: ResourceGroup[] = [
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
      ParagraphMaterial.componentName,
      StatisticMaterial.componentName,
      IconViewMaterial.componentName,
      AvatarMaterial.componentName,
      BadgeMaterial.componentName,
      ImageViewMaterial.componentName,
      LoopPanelMaterial.componentName,
      TagMaterial.componentName,
    ]
  },
  {
    titleKey: 'forms',
    items: [
      FormMaterial.componentName,
      FormLayoutMaterial.componentName,
      InlineFormMaterial.componentName,
      FormItemMaterial.componentName,
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
  {
    titleKey: 'layouts',
    items: [
      RowMaterial.componentName,
      ColMaterial.componentName,
      HCFLayoutMaterial.componentName,
      TwoColumnLayoutMaterial.componentName,
      LogoMaterial.componentName,
      MenuMaterial.componentName,
      CardMaterial.componentName,
      BoxMaterial.componentName,
      PaperMaterial.componentName,
      DividerMaterial.componentName,
      BreadcrumbMaterial.componentName,
      HeroMaterial.componentName,
      SpaceMaterial.componentName,
    ]
  },
  {
    titleKey: 'datas',
    items: [
      ListMaterial.componentName,
      ListItemMetaMaterial.componentName,
      TableMaterial.componentName,
      TableColumnMaterial.componentName,
      ArrayPanelMaterial.componentName,
      TreeListMaterial.componentName,
      TreeListItemMaterial.componentName,
      ObjectContainerMaterial.componentName,
    ]
  },
  {
    titleKey: 'business',
    items: [
      RightAdMaterial.componentName,
      NewsMaterial.componentName,
      NoticesMaterial.componentName,
    ]
  }
]

export const fields: IResource[] = [
  InputFieldResource,
]

