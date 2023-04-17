import { IComponentMaterial } from "@rxdrag/react-core";
import { IResource } from "@rxdrag/core";
import { ButtonMaterial, InputMaterial, InputNumberMaterial, AutoCompleteMaterial, SelectMaterial, CheckboxMaterial, DatePickerMaterial, DateRangePickerMaterial, MentionsMaterial, RadioMaterial, SliderMaterial, SwitchMaterial, TimePickerMaterial, CascaderMaterial, TreeSelectMaterial, TitleMaterial, TextMaterial, LinkMaterial, ParagraphMaterial, IconViewMaterial, AvatarMaterial, BadgeMaterial, ImageViewMaterial, LoopPanelMaterial, TagMaterial, FormMaterial, FormItemMaterial, DropdownMaterial, DialogMaterial, DrawerMaterial, PopconfirmMaterial, PopoverMaterial, ListMaterial, ListItemMetaMaterial, TableMaterial, TableColumnMaterial, InputFieldResource, DefaultSlotMaterial, ActionSlotMaterial, ExtraSlotMaterial, StatisticMaterial, TooltipMaterial, TextAreaMaterial, RateMaterial, TransferMaterial, BoxMaterial, BreadcrumbMaterial, CardMaterial, ColMaterial, DividerMaterial, HCFLayoutMaterial, HeroMaterial, LogoMaterial, MenuMaterial, PaperMaterial, RowMaterial, SpaceMaterial, TwoColumnLayoutMaterial } from "@rxdrag/react-antd-materials";
import { NewsMaterial } from "./business/News";
import { NoticesMaterial } from "./business/Notices";
import { RightAdMaterial } from "./business/RightAd";

export type MaterialGroup = {
  titleKey: string,
  items: IComponentMaterial[]
}

export const materials: MaterialGroup[] = [
  {
    titleKey: 'inputs',
    items: [
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
    ]
  },
  {
    titleKey: 'displays',
    items: [
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
    ]
  },
  {
    titleKey: 'forms',
    items: [
      FormMaterial,
      FormItemMaterial,
    ]
  },
  {
    titleKey: 'popups',
    items: [
      DropdownMaterial,
      DialogMaterial,
      DrawerMaterial,
      PopconfirmMaterial,
      PopoverMaterial,
      TooltipMaterial,
    ]
  },
  {
    titleKey: 'layouts',
    items: [
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
    ]
  },
  {
    titleKey: 'datas',
    items: [
      ListMaterial,
      ListItemMetaMaterial,
      TableMaterial,
      TableColumnMaterial,
    ]
  },
  {
    titleKey: 'business',
    items: [
      RightAdMaterial,
      NewsMaterial,
      NoticesMaterial,
    ]
  }
]

export const fields: IResource[] = [
  InputFieldResource,
]

export const slots: IComponentMaterial[] = [
  DefaultSlotMaterial,
  ActionSlotMaterial,
  ExtraSlotMaterial
]