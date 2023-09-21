import { DeviceType } from "../interfaces";
import { IMenu } from "../interfaces/menu";

export const defaultMenus: { [device: string]: IMenu[] | undefined } = {
  [DeviceType.admin]: [
    {
      id: "menu1-admin",
      title: "默认菜单",
      items: [
        {
          "id": "group1",
          "type": "group",
          "config": {
            "title": "测试"
          },
          "children": []
        },
        {
          "id": "y_FPgPlR",
          "type": "link",
          "config": {
            "title": "新建链接"
          },
          "children": []
        },
        {
          "id": "msImUKp4",
          "type": "group",
          "config": {
            "title": "新建组"
          },
          "children": [
            {
              "id": "yIlMl53J",
              "type": "module",
              "config": {
                "title": "用户管理",
                "moduleId": "users",
                "icon": {
                  "iconKey": "PlusCircleOutlined"
                }
              },
              "children": []
            },
            {
              "id": "LnzFwF5k",
              "type": "module",
              "config": {
                "title": "客户",
                "moduleId": "customers"
              },
              "children": []
            }
          ]
        }
      ]
    },
    {
      id: "menu2-admin",
      title: "侧边栏导航",
    },
  ]
}