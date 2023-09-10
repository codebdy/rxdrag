import { INodeSchema } from "@rxdrag/schema";
import { IModule } from "../interfaces/module";
import { DeviceType } from "../interfaces";

const rootNodeSchema: INodeSchema = {
  componentName: "Page"
}

export const modules: { [device: string]: IModule[] | undefined } = {
  [DeviceType.admin]: [
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
  ],
  [DeviceType.h5]: [
    {
      id: "users",
      title: "用户管理(h5)",
      scenes: [
        {
          title: "入口页(h5)",
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
      title: "供应商(h5)"
    },
    {
      id: "customers",
      title: "客户(h5)"
    }
  ],
  [DeviceType.website]: [
    {
      id: "users",
      title: "用户管理(门户)",
      scenes: [
        {
          title: "入口页(门户)",
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
      title: "供应商(门户)"
    },
    {
      id: "customers",
      title: "客户(门户)"
    }
  ],
  [DeviceType.largeScreen]: [
    {
      id: "users",
      title: "用户管理(大屏)",
      scenes: [
        {
          title: "入口页(大屏)",
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
      title: "供应商(大屏)"
    },
    {
      id: "customers",
      title: "客户(大屏)"
    }
  ],
}