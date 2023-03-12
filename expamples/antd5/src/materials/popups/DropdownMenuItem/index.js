import { DropdownMenuItem } from "expamples/ant5/components/popups/DropdownMenuItem";
import { DropdownMenuItemDesigner } from "./designer";
import { locales } from "./locales";
import { materialSchema } from "./schema";
const name = "DropdownMenuItem";
export const DropdownMenuItemMaterial = {
    componentName: name,
    component: DropdownMenuItem,
    designer: DropdownMenuItemDesigner,
    designerLocales: locales,
    designerSchema: materialSchema,
    designerProps: {
    //readOnly: true,
    },
    behaviorRule: {
        droppable: false,
    }
};
