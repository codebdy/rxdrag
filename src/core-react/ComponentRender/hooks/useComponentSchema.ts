import { useContext } from "react";
import { IComponentRenderSchema } from "../ComponentView";
import { ComponentSchemaContext } from "../contexts";

export function useComponentSchema(){
  const schema = useContext<IComponentRenderSchema|undefined>(ComponentSchemaContext)
  return schema;
}