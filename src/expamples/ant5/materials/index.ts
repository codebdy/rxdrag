import { IComponentMaterial, IMaterialResource } from "core-react";
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
import { TextViewMaterial } from "./displays/TextView";
import { StatisticMaterial } from "./displays/Statistic";
import { BoxMaterial } from "./layouts/Box";
import { IconViewMaterial } from "./displays/IconView";
import { JobsMaterial } from "./business/Jobs";
import { RightAdMaterial } from "./business/RightAd";
import { DividerMaterial } from "./layouts/Divider";
import { NewsMaterial } from "./business/News";
import { CustomersMaterial } from "./business/Customers";
import { NoticesMaterial } from "./business/Notices";
import { PaperMaterial } from "./layouts/Paper";
import { BreadcrumbMaterial } from "./layouts/Breadcrumb";
import { FormMaterial } from "./Form";
import { FormItemMaterial } from "./FormItem";
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

export const inputMaterials: IComponentMaterial[] = [
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

export const displayMaterials: IComponentMaterial[] = [
  TextViewMaterial,
  StatisticMaterial,
  IconViewMaterial,
  AvatarMaterial,
  BadgeMaterial,
]

export const fomrMaterials: IComponentMaterial[] = [
  FormMaterial,
  FormItemMaterial,
]

export const popupMaterials: IComponentMaterial[] = [
  DropdownMaterial,
  DialogMaterial,
  DrawerMaterial,
  PopconfirmMaterial,
  PopoverMaterial,
  TooltipMaterial,
]

export const layoutMaterials: IComponentMaterial[] = [
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
]

export const businessMaterials: IComponentMaterial[] = [
  JobsMaterial,
  RightAdMaterial,
  NewsMaterial,
  CustomersMaterial,
  NoticesMaterial,
]

export const fields: IMaterialResource[] = [
  InputFieldResource,
]