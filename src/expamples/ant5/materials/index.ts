import { IComponentMaterial } from "core-react";
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

export const inputMaterials: IComponentMaterial[] = [
  ButtonMaterial,
  InputMaterial,
  SelectMaterial,
]

export const layoutMaterials:IComponentMaterial[] = [
  RowMaterial,
  ColMaterial,
  HCFLayoutMaterial,
  TwoColumnLayoutMaterial,
  LogoMaterial,
  MenuMaterial,
  AvatarMaterial,
]