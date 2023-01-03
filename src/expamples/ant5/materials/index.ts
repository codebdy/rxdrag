import { IComponentMaterial, IMaterialResource } from "core-react";
import { ButtonMaterial } from "./Button";
import { ColMaterial } from "./Col";
import { HCFLayoutMaterial } from "./layouts/HCFLayout";
import { InputMaterial } from "./Input";
import { TwoColumnLayoutMaterial } from "./layouts/TwoColumnLayout";
import { RowMaterial } from "./Row";
import { SelectMaterial } from "./Select";
import { LogoMaterial } from "./Logo";
import { MenuMaterial } from "./Menu";
import { AvatarMaterial } from "./Avatar";
import { HeroTipMaterial } from "./business/HeroTip";
import { CardMaterial } from "./Card";
import { TextViewMaterial } from "./TextView";
import { StatisticMaterial } from "./Statistic";
import { BoxMaterial } from "./Box";
import { IconViewMaterial } from "./IconView";
import { JobsMaterial } from "./business/Jobs";
import { RightAdMaterial } from "./business/RightAd";
import { DividerMaterial } from "./Divider";
import { NewsMaterial } from "./business/News";
import { CustomersMaterial } from "./business/Customers";
import { NoticesMaterial } from "./business/Notices";
import { PaperMaterial } from "./Paper";
import { BreadcrumbMaterial } from "./layouts/Breadcrumb";
import { FormMaterial } from "./Form";
import { FormItemMaterial } from "./FormItem";
import { InputFieldResource } from "./fields/InputField";

export const inputMaterials: IComponentMaterial[] = [
  ButtonMaterial,
  InputMaterial,
  SelectMaterial,
]

export const displayMaterials: IComponentMaterial[] = [
  TextViewMaterial,
  StatisticMaterial,
  IconViewMaterial,
  AvatarMaterial,
]

export const fomrMaterials: IComponentMaterial[] = [
  FormMaterial,
  FormItemMaterial,
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
]

export const businessMaterials: IComponentMaterial[] = [
  HeroTipMaterial,
  JobsMaterial,
  RightAdMaterial,
  NewsMaterial,
  CustomersMaterial,
  NoticesMaterial,
]

export const fields: IMaterialResource[] = [
  InputFieldResource,
]