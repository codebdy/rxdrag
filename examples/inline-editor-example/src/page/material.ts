import { PageDesigner } from "./Designer";
import { PagePreview } from "./Preview";

export const pageMaterial = {
  componentName: "Page",
  component: PagePreview,
  designer: PageDesigner,
  behaviorRule: {
    droppable: true,
  }
}