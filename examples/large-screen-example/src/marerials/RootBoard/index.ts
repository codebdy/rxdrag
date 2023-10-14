import { IMaterial } from "@rxdrag/react-core";
import { locales, setterLocales } from "./locales";
import { schema } from "./schema";
import { RootBoard } from "../../components/RootBoard";
import { ThemeTokenSetter } from "./setters";

export const RootBoardMaterial: IMaterial = {
  componentName: "RootBoard",
  component: RootBoard,
  designer: RootBoard,
  propsSchema: schema,
  designerLocales: locales,
  behaviorRule: {
    droppable: true,
    freedomContainer: true,
  },
  setters: {
    ThemeTokenSetter
  },
  setterLocales: setterLocales,
}