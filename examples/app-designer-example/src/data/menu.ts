import { DeviceType } from "../interfaces";
import { IMenu } from "../interfaces/menu";

export const defaultMenus: { [device: string]: IMenu[] | undefined } = {
  [DeviceType.admin]: [
    {
      id: "menu1-admin",
      title: "默认菜单",
      items: [
        {
          id: "group1",
          type: "group",
          config: {
            title: "测试"
          }
        }
      ]
    },
    {
      id: "menu2-admin",
      title: "侧边栏导航",
    },
  ]
}