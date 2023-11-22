import { Statistic } from "@rxdrag/react-antd-components";
import { IMaterial } from "@rxdrag/react-core";
import { statisticIcon } from "./icon";
import { statisticLocales, statisticResourceLocales } from "./locales";
import { staticSchema } from "./schema";

const name = "Statistic"
export const StatisticMaterial: IMaterial = {
  componentName: name,
  component: Statistic,
  designer: Statistic,
  designerLocales: statisticLocales,
  propsSchema: staticSchema,
  
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
  behaviorRule: {
    noRef: false,
  }
}
