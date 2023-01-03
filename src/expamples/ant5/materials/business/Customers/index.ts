import { IComponentMaterial } from "core-react";
import { Customers } from "expamples/ant5/components/business/Customers";
import { customersIcon } from "./icon";
import { CustomersLocales, customersResourceLocales } from "./locales";
import { newsSchema } from "./schema";

const name = "Customers"
export const CustomersMaterial: IComponentMaterial = {
  componentName: name,
  component: Customers,
  designer: Customers,
  designerLocales: CustomersLocales,
  designerSchema: newsSchema,
  resource: {
    name: name,
    icon: customersIcon,
    color: "#8B79EC",
    resourceLocales: customersResourceLocales,
    elements: [
      {
        componentName: name,
      }
    ]
  },

  behaviorRule: {
    droppable: true,
    noPlaceholder: true,
  }
}
