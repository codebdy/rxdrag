import { IComponentMaterial } from "core-react";
import { ButtonMaterial } from "./Button";
import { ColMaterial } from "./Col";
import { HCFLayoutMaterial } from "./layouts/HCFLayout";
import { InputMaterial } from "./Input";
import { TwoColumnLayoutMaterial } from "./layouts/TwoColumnLayout";
import { RowMaterial } from "./Row";
import { SelectMaterial } from "./Select";
import { LogoMaterial } from "./Logo";

export const inputMaterials: IComponentMaterial[] = [
  ButtonMaterial,
  InputMaterial,
  SelectMaterial,
  LogoMaterial,
]

export const layoutMaterials:IComponentMaterial[] = [
  RowMaterial,
  ColMaterial,
  HCFLayoutMaterial,
  TwoColumnLayoutMaterial
]