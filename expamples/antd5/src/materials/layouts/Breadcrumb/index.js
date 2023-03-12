import { breadcrumbIcon } from "./icon";
import { breadcrumbLocales, breadcrumbResourceLocales } from "./locales";
import { breadcrumbSchema } from "./schema";
import { Breadcrumb } from "expamples/ant5/components/layouts/Breadcrumb";
const name = "Breadcrumb";
export const BreadcrumbMaterial = {
    componentName: name,
    component: Breadcrumb,
    designer: Breadcrumb,
    designerLocales: breadcrumbLocales,
    designerSchema: breadcrumbSchema,
    resource: {
        name: name,
        icon: breadcrumbIcon,
        color: "#dfa324",
        resourceLocales: breadcrumbResourceLocales,
        elements: [
            {
                componentName: name,
            }
        ]
    },
    behaviorRule: {
        droppable: true,
    }
};
