import { IComponentMaterial } from "core-react";
import { jobsIcon } from "./icon";
import { jobsLocales, jobsResourceLocales } from "./locales";
import { jobsSchema } from "./schema";
import { Jobs } from "expamples/ant5/components/business/Jobs";

const name = "Jobs"
export const JobsMaterial: IComponentMaterial = {
  componentName: name,
  component: Jobs,
  designer: Jobs,
  designerLocales: jobsLocales,
  designerSchema: jobsSchema,
  resource: {
    name: name,
    elements: [
      {
        componentName: name,
      }
    ]
  },
  icon: jobsIcon,
  color: "#dfa324",
  resourceLocales: jobsResourceLocales,
  behaviorRule: {
    droppable: true,
    noPlaceholder: true,
  }
}
