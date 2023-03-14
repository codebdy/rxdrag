import { IComponentMaterial } from "core-react";
import { ButtonMaterial } from "./Button";
import { ColMaterial } from "./layouts/Col";
import { HCFLayoutMaterial } from "./layouts/HCFLayout";
import { InputMaterial } from "./inputs/Input";
import { TwoColumnLayoutMaterial } from "./layouts/TwoColumnLayout";
import { RowMaterial } from "./layouts/Row";
import { SelectMaterial } from "./inputs/Select";
import { LogoMaterial } from "./layouts/Logo";
import { MenuMaterial } from "./layouts/Menu";
import { AvatarMaterial } from "./displays/Avatar";
import { CardMaterial } from "./layouts/Card";
import { TextMaterial } from "./displays/typography/Text";
import { StatisticMaterial } from "./displays/Statistic";
import { BoxMaterial } from "./layouts/Box";
import { IconViewMaterial } from "./displays/IconView";
import { RightAdMaterial } from "./business/RightAd";
import { DividerMaterial } from "./layouts/Divider";
import { NewsMaterial } from "./business/News";
import { NoticesMaterial } from "./business/Notices";
import { PaperMaterial } from "./layouts/Paper";
import { BreadcrumbMaterial } from "./layouts/Breadcrumb";
import { FormMaterial } from "./forms/Form";
import { FormItemMaterial } from "./forms/FormItem";
import { InputFieldResource } from "./fields/InputField";
import { TextAreaMaterial } from "./inputs/Input/textarea";
import { CheckboxMaterial } from "./inputs/CheckBox";
import { DatePickerMaterial } from "./inputs/DatePicker";
import { DateRangePickerMaterial } from "./inputs/DateRangePicker";
import { InputNumberMaterial } from "./inputs/InputNumber";
import { MentionsMaterial } from "./inputs/Mentions";
import { RadioMaterial } from "./inputs/Radio";
import { RateMaterial } from "./inputs/Rate";
import { SliderMaterial } from "./inputs/Slider";
import { SwitchMaterial } from "./inputs/Switch";
import { TimePickerMaterial } from "./inputs/TimePicker";
import { CascaderMaterial } from "./inputs/Cascader";
import { AutoCompleteMaterial } from "./inputs/AutoComplete";
import { TransferMaterial } from "./inputs/Transfer";
import { TreeSelectMaterial } from "./inputs/TreeSelect";
import { DropdownMaterial } from "./popups/Dropdown";
import { DialogMaterial } from "./popups/Dialog";
import { DrawerMaterial } from "./popups/Drawer";
import { PopconfirmMaterial } from "./popups/Popconfirm";
import { PopoverMaterial } from "./popups/Popover";
import { TooltipMaterial } from "./popups/Tooltip";
import { BadgeMaterial } from "./displays/Badge";
import { HeroMaterial } from "./layouts/Hero";
import { ImageViewMaterial } from "./displays/ImageView";
import { ListMaterial } from "./datas/List";
import { ListItemMetaMaterial } from "./datas/ListItemMeta";
import { DefaultSlotMaterial } from "./slots/DefualtSlot";
import { ActionSlotMaterial } from "./slots/ActionSlot";
import { ExtraSlotMaterial } from "./slots/ExtraSlot";
import { TableMaterial } from "./datas/Table";
import { TableColumnMaterial } from "./datas/TableColumn";
import { LinkMaterial } from "./displays/typography/Link";
import { SpaceMaterial } from "./layouts/Space";
import { TitleMaterial } from "./displays/typography/Title";
import { ParagraphMaterial } from "./displays/typography/Paragraph";
import { LoopPanelMaterial } from "./displays/LoopPanel";
import { TagMaterial } from "./displays/Tag";
import { IResource } from "core";

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