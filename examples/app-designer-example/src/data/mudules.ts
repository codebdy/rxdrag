import { INodeSchema } from "@rxdrag/schema";
import { IModule } from "../interfaces/module";

const rootNodeSchema: INodeSchema = {
  componentName: "Page"
}

export const modules: IModule[] = [
  {
    id: "users",
    title: "用户管理",
    scenes: [
      {
        title: "入口页",
        schema: rootNodeSchema,
      },
      {
        title: "编辑对话框",
        schema: rootNodeSchema,
      }
    ]
  },
  {
    id: "suppliers",
    title: "供应商"
  },
  {
    id: "customers",
    title: "客户"
  }
]