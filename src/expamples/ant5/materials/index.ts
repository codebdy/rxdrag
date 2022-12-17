import { IComponentMaterial } from "core-react";
import { ButtonMaterial } from "./Button";
import { ColMaterial } from "./Col";
import { HCFLayoutMaterial } from "./HCFLayout";
import { InputMaterial } from "./Input";
import { RowMaterial } from "./Row";
import { SelectMaterial } from "./Select";

export const inputMaterials: IComponentMaterial[] = [
  ButtonMaterial,
  InputMaterial,
  SelectMaterial
]

export const layoutMaterials:IComponentMaterial[] = [
  RowMaterial,
  ColMaterial,
  HCFLayoutMaterial
]