import { INodeSchema } from "@rxdrag/schema";
import { IModule, IModuleCategory } from "../interfaces/module";
import { DeviceType } from "../interfaces";

const rootNodeSchema: INodeSchema = {
  componentName: "Page"
}

const userList = {
  "componentName": "Page",
  "slots": {},
  "children": [
    {
      "componentName": "Form",
      "props": {
        "colon": false
      },
      "x-controller": {
        "id": "LlRDj22u",
        "name": "查询表单",
        "enable": true
      },
      "slots": {},
      "children": [
        {
          "componentName": "Input",
          "x-controller": {
            "id": "Ddl53loc",
            "name": "字段1",
            "enable": true
          },
          "slots": {},
          "children": []
        },
        {
          "componentName": "Input",
          "x-controller": {
            "id": "ndwJ5LwA",
            "name": "字段2",
            "enable": true
          },
          "slots": {},
          "children": []
        }
      ]
    },
    {
      "componentName": "Table",
      "selfRender": true,
      "x-controller": {
        "id": "JClydKG7",
        "name": "用户列表",
        "enable": true
      },
      "slots": {},
      "children": [
        {
          "componentName": "TableColumn",
          "props": {
            "title": "Column1"
          },
          "slots": {},
          "children": []
        },
        {
          "componentName": "TableColumn",
          "props": {
            "title": "Column2"
          },
          "slots": {},
          "children": []
        },
        {
          "componentName": "TableColumn",
          "props": {
            "title": "Column3"
          },
          "slots": {},
          "children": [
            {
              "componentName": "Button",
              "props": {
                "type": "primary",
                "title": "编辑"
              },
              "x-controller": {
                "id": "j4lFf--c",
                "name": "编辑按钮",
                "enable": true
              },
              "slots": {},
              "children": []
            }
          ]
        }
      ]
    }
  ]
}

const mole = {
  "componentName": "Page",
  "x-controller": {
    "id": "PAG2t2Ur",
    "enable": true,
    "name": "页面"
  },
  "slots": {},
  "children": [
    {
      "componentName": "Row",
      "props": {
        "gutter": 6,
        "style": {
          "marginTop": "16px",
          "marginRight": "16px",
          "marginBottom": "16px",
          "marginLeft": "16px",
          "paddingTop": "16px",
          "paddingRight": "16px",
          "paddingBottom": "16px",
          "paddingLeft": "16px"
        }
      },
      "slots": {},
      "children": [
        {
          "componentName": "ArrayPanel",
          "x-field": {
            "type": "array",
            "name": "container"
          },
          "x-controller": {
            "id": "KiE-KrsA",
            "enable": true,
            "name": "数组容器"
          },
          "slots": {},
          "children": [
            {
              "componentName": "Col",
              "props": {
                "span": 4,
                "style": {
                  "paddingTop": "16px",
                  "paddingBottom": "16px"
                }
              },
              "slots": {},
              "children": [
                {
                  "componentName": "Button",
                  "props": {
                    "type": "primary",
                    "title": "地鼠",
                    "shape": "circle",
                    "size": "large",
                    "style": {
                      "width": "80px",
                      "height": "80px"
                    }
                  },
                  "x-controller": {
                    "id": "NpLxKVZs",
                    "enable": true,
                    "name": "地鼠"
                  },
                  "slots": {},
                  "children": []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "componentName": "Row",
      "props": {
        "style": {
          "marginLeft": "16px",
          "marginRight": "16px",
          "paddingRight": "16px",
          "paddingLeft": "16px"
        }
      },
      "slots": {},
      "children": [
        {
          "componentName": "Col",
          "props": {
            "span": 6
          },
          "slots": {},
          "children": [
            {
              "componentName": "Space",
              "props": {},
              "selfRender": true,
              "slots": {},
              "children": [
                {
                  "componentName": "Button",
                  "props": {
                    "type": "primary",
                    "title": "开始",
                    "size": "large"
                  },
                  "x-controller": {
                    "id": "uQPenUqJ",
                    "enable": true,
                    "name": "开始按钮"
                  },
                  "slots": {},
                  "children": []
                },
                {
                  "componentName": "Button",
                  "props": {
                    "type": "default",
                    "title": "结束",
                    "size": "large"
                  },
                  "x-controller": {
                    "id": "-V60Mne6",
                    "enable": true,
                    "name": "结束按钮"
                  },
                  "slots": {},
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "componentName": "Col",
          "props": {
            "span": 6
          },
          "slots": {},
          "children": [
            {
              "componentName": "Text",
              "props": {
                "value": "分数："
              },
              "slots": {},
              "children": []
            },
            {
              "componentName": "Text",
              "props": {
                "value": "-"
              },
              "x-controller": {
                "id": "g1rEXDcH",
                "enable": true,
                "name": "分数"
              },
              "slots": {},
              "children": []
            }
          ]
        },
        {
          "componentName": "Col",
          "props": {
            "span": 6
          },
          "slots": {},
          "children": [
            {
              "componentName": "Button",
              "props": {
                "type": "primary",
                "title": "设置",
                "size": "large"
              },
              "x-controller": {
                "id": "FfF5nHpb",
                "enable": true,
                "name": "设置按钮"
              },
              "slots": {
                "icon": {
                  "componentName": "IconView",
                  "props": {
                    "icon": {
                      "iconKey": "SettingOutlined"
                    }
                  },
                  "slots": {},
                  "children": []
                }
              },
              "children": []
            }
          ]
        }
      ]
    }
  ]
}

const moleSetting = {
  "componentName": "Dialog",
  "x-controller": {
    "id": "eu2MFGfi",
    "enable": true,
    "name": "设置对话框"
  },
  "slots": {
    "title": {
      "componentName": "DialogTitle",
      "slots": {},
      "children": [
        {
          "componentName": "Text",
          "props": {
            "value": "游戏设置"
          },
          "slots": {},
          "children": []
        }
      ]
    },
    "footer": {
      "componentName": "DialogFooter",
      "slots": {},
      "children": [
        {
          "componentName": "Button",
          "props": {
            "type": "default",
            "title": "取消"
          },
          "x-controller": {
            "id": "OfONgEFW",
            "enable": true,
            "name": "取消按钮"
          },
          "slots": {},
          "children": []
        },
        {
          "componentName": "Button",
          "props": {
            "type": "primary",
            "title": "确认"
          },
          "x-controller": {
            "id": "sghItTwt",
            "enable": true,
            "name": "确认按钮"
          },
          "slots": {},
          "children": []
        }
      ]
    }
  },
  "children": [
    {
      "componentName": "Form",
      "props": {
        "colon": false,
        "labelCol": {
          "offset": 6
        }
      },
      "x-controller": {
        "id": "CF2PN88a",
        "enable": true,
        "name": "表单"
      },
      "slots": {},
      "children": [
        {
          "componentName": "FormItem",
          "props": {
            "label": "地鼠数量"
          },
          "locked": false,
          "x-field": {
            "name": "count"
          },
          "slots": {},
          "children": [
            {
              "componentName": "InputNumber",
              "slots": {},
              "children": []
            }
          ]
        },
        {
          "componentName": "FormItem",
          "props": {
            "label": "时间间隔"
          },
          "locked": false,
          "x-field": {
            "name": "interval"
          },
          "slots": {},
          "children": [
            {
              "componentName": "InputNumber",
              "slots": {},
              "children": []
            }
          ]
        }
      ]
    }
  ]
}

export const defaultModules: { [device: string]: IModule[] | undefined } = {
  [DeviceType.admin]: [
    {
      id: "users",
      title: "用户管理",
      views: [
        {
          id: "user-index",
          title: "入口页",
          schema: userList,
        },
        {
          id: "user-edit",
          title: "编辑对话框",
          schema: rootNodeSchema,
        }
      ],
    },
    {
      id: "mole",
      title: "打地鼠",
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
          id: "mole",
          title: "打地鼠",
        },
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

