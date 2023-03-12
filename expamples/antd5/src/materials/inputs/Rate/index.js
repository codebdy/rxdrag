import { Rate } from "antd";
import { RateDesigner } from "expamples/ant5/materials/inputs/Rate/designer";
import { icon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { materialSchema } from "./schema";
const name = "Rate";
export const RateMaterial = {
    componentName: name,
    component: Rate,
    designer: RateDesigner,
    designerLocales: locales,
    designerSchema: materialSchema,
    designerProps: {
    //readOnly: true,
    },
    resource: {
        name: name,
        resourceLocales: resourceLocales,
        icon: icon,
        color: "#8B79EC",
        elements: [
            {
                componentName: name,
            }
        ]
    },
};
