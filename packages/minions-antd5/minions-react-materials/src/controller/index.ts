import { setPropMaterial } from "./setProp";
import { setVariableMaterial } from "./setVariable";
import { IRxDragActivityMaterial } from "../interfaces";
import { IControllerEditorContextParam } from "@rxdrag/minions-controller-editor";
import { readVariableMaterial } from "./readVariable";
import { listenVariableMaterial } from "./listenVariable";
import { listenPropMaterial } from "./listenProp";
import { readPropMaterial } from "./readProp";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const controllerActivites: IRxDragActivityMaterial<any, IControllerEditorContextParam>[] = [
  setPropMaterial,
  listenPropMaterial,
  readPropMaterial,
  setVariableMaterial,
  listenVariableMaterial,
  readVariableMaterial,
]