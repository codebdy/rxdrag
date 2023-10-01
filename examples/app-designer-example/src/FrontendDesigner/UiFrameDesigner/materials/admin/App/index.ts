import { IMaterial } from "@rxdrag/react-core";
import { locales, setterLocales } from "./locales";
import { schema } from "./schema";
import { ThemeTokenSetter } from "./setters";
import { App } from "../../../../components/admin";

export const AppMaterial: IMaterial = {
  componentName: "App",
  component: App,
  designer: App,
  propsSchema: schema,
  designerLocales: locales,
  behaviorRule: {
    droppable: true,
    freedomContainer: true,
    noPlaceholder: true,
  },
  setters: {
    ThemeTokenSetter
  },
  setterLocales: setterLocales,
}