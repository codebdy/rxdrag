import { INodeSchema } from "core";
import { makeRxId } from "core/utils/make-rxId";
import { IComponentRenderSchema } from "./ComponentView";

export function transToRenderSchema(node:INodeSchema) :IComponentRenderSchema{
  return {
    id:makeRxId(),
    ...node,
    children: node?.children?.map(child=>transToRenderSchema(child))
  }
}