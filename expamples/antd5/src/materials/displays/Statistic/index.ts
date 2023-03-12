import { IComponentMaterial } from "core-react";
import { Statistic } from "expamples/ant5/components/displays/Statistic";
import { statisticIcon } from "./icon";
import { statisticLocales, statisticResourceLocales } from "./locales";
import { staticSchema } from "./schema";

const name = "Statistic"
export const StatisticMaterial: IComponentMaterial = {
  componentName: name,
  component: Statistic,
  designer: Statistic,
  designerLocales: statisticLocales,
  designerSchema: staticSchema,
  resource: {
    name: name,
    icon: statisticIcon,
    color: "#dfa324",
    resourceLocales: statisticResourceLocales,
    elements: [
      {
        componentName: name,
        props: {
          title: name,
        }
      }
    ]
  },

}
