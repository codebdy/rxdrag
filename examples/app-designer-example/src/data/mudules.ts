import { INodeSchema, ViewType } from "@rxdrag/schema";
import { IModule, IModuleCategory } from "../interfaces/module";
import { DeviceType } from "../interfaces";
import mole from "./molepage.json"
import moleSetting from "./molesettings.json"
import userList from "./userList.json"
import expression from "./expression.json"
import editUser from "./edituser.json"
import postList from "./postList.json"
import editPost from "./editpost.json"
import editDepartment from "./editdepartment.json"

const rootNodeSchema: INodeSchema = {
  componentName: "Page"
}

export const defaultModules: { [device: string]: IModule[] | undefined } = {
  [DeviceType.admin]: [
    {
      id: "users",
      title: "用户管理",
      variables: [
        {
          "id": "LJYNYrrL",
          "name": "当前部门",
          "defaultValue": null
        }
      ],
      views: [
        {
          id: "user-index",
          title: "入口页",
          viewType: ViewType.Main,
          schema: userList,
        },
        {
          id: "user-edit",
          title: "用户对话框",
          schema: editUser,
        },
        {
          id: "department-edit",
          title: "部门对话框",
          schema: editDepartment,
        }
      ],
    },
    {
      id: "roles",
      title: "角色管理",
      views: [
        {
          id: "roles-index",
          title: "入口页",
          viewType: ViewType.Main,
          schema: rootNodeSchema,
        },
        {
          id: "role-edit",
          title: "编辑对话框",
          schema: rootNodeSchema,
        }
      ],
    },
    {
      id: "departments",
      title: "部门管理",
      views: [
        {
          id: "departments-index",
          title: "入口页",
          viewType: ViewType.Main,
          schema: rootNodeSchema,
        },
        {
          id: "department-edit",
          title: "编辑对话框",
          schema: rootNodeSchema,
        }
      ],
    },
    {
      id: "posts",
      title: "文章",
      views: [
        {
          id: "posts-index",
          title: "入口页",
          viewType: ViewType.Main,
          schema: postList,
        },
        {
          id: "post-edit",
          title: "编辑对话框",
          schema: editPost,
        }
      ],
    },
    {
      id: "expression-demo",
      title: "表达式演示",
      views: [
        {
          id: "expression-index",
          title: "入口页",
          viewType: ViewType.Main,
          schema: expression,
        },
      ],
    },
    {
      id: "mole",
      title: "打地鼠",
      views: [
        {
          id: "main-page",
          title: "主页面",
          viewType: ViewType.Main,
          schema: mole,
        },
        {
          id: "settings-diaglog",
          title: "游戏设置",
          schema: moleSetting,
        }
      ],
      variables: [
        {
          "id": "2AHnQ-ne",
          "name": "活跃地鼠",
          "defaultValue": -1
        },
        {
          "id": "_G4SZqNV",
          "name": "成绩",
          "defaultValue": 0
        },
        {
          "id": "_-uxpUk0",
          "name": "地鼠数量",
          "defaultValue": 9
        },
        {
          "id": "tAE2cmwc",
          "name": "时间间隔",
          "defaultValue": 2000
        },
        {
          "id": "UBbpfK7M",
          "name": "运行",
          "defaultValue": false
        }
      ]
    },
    {
      id: "mole-script",
      title: "打地鼠(脚本)",
      views: [
        {
          id: "main-page",
          title: "主页面",
          schema: mole,
        },
        {
          id: "settings-diaglog",
          title: "游戏设置",
          schema: moleSetting,
        }
      ],
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
      views: [
        {
          id: "h5-user-index",
          title: "入口页(h5)",
          viewType: ViewType.Main,
          schema: rootNodeSchema,
        },
        {
          id: "h5-user-eidit",
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
      views: [
        {
          id: "website-user-index",
          title: "入口页(门户)",
          viewType: ViewType.Main,
          schema: rootNodeSchema,
        },
        {
          id: "weibsite-user-edit",
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
      views: [
        {
          id: "lg-user-index",
          title: "入口页(大屏)",
          viewType: ViewType.Main,
          schema: rootNodeSchema,
        },
        {
          id: "lg-user-edit",
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

export const defaultModuleCategories: { [device: string]: IModuleCategory[] | undefined } = {
  [DeviceType.admin]: [
    {
      id: 'basics',
      title: '基础模块',
      modules: [
        {
          id: "users",
          title: "用户管理",
        },
        {
          id: "roles",
          title: "角色管理",
        },
        {
          id: "departs",
          title: "部门管理",
        },
        {
          id: "posts",
          title: "文章管理",
        },
        {
          id: "expression-demo",
          title: "表达式示例",
        },
        {
          id: "mole",
          title: "打地鼠",
        },
        {
          id: "mole-script",
          title: "打地鼠(脚本)",
        }
      ]
    },
    {
      id: 'crm',
      title: '客户关系CRM',
      modules: [
        {
          id: "suppliers",
          title: "供应商",
        },
        {
          id: "customers",
          title: "客户",
        },
      ]
    },
  ],
  [DeviceType.h5]: [
    {
      id: 'basics',
      title: '基础模块(H5)',
      modules: [
        {
          id: "users",
          title: "用户管理",
        },
      ]
    },
    {
      id: 'crm',
      title: '客户管理(H5)',
      modules: [
        {
          id: "suppliers",
          title: "供应商",
        },
        {
          id: "customers",
          title: "客户",
        },
      ]
    },
  ],
  [DeviceType.website]: [
    {
      id: 'basics',
      title: '基础模块(门户)',
      modules: [
        {
          id: "users",
          title: "用户管理",
        },
      ]
    },
    {
      id: 'crm',
      title: '客户管理(门户)',
      modules: [
        {
          id: "suppliers",
          title: "供应商",
        },
        {
          id: "customers",
          title: "客户",
        },
      ]
    },
  ],
  [DeviceType.largeScreen]: [
    {
      id: 'basics',
      title: '基础模块(大屏)',
      modules: [
        {
          id: "users",
          title: "用户管理",
        },
      ]

    },
    {
      id: 'crm',
      title: '客户管理(大屏)',
      modules: [
        {
          id: "suppliers",
          title: "供应商",
        },
        {
          id: "customers",
          title: "客户",
        },
      ]
    },
  ],
}

