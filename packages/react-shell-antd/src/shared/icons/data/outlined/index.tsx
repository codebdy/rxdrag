import { BorderOutlined } from "@ant-design/icons";
import React from "react";
import { IIconCategory } from "../../model";
import { directional } from "./directional";
import { editor } from "./editor";
import { suggested } from "./suggested";

export const outlinedIcons: IIconCategory = {
  name: "Outlined",
  icon: <BorderOutlined />,
  iconGroups: [directional, suggested, editor]
}