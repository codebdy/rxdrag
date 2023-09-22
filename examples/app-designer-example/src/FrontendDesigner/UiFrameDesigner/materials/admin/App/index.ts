import { IComponentMaterial } from "@rxdrag/react-core";
import { locales, setterLocales } from "./locales";
import { schema } from "./schema";
import { ThemeTokenSetter } from "./setters";
import { App } from "../../../../components/admin";

export const AppMaterial: IComponentMaterial = {
  componentName: "App",
  component: App,
  designer: App,
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