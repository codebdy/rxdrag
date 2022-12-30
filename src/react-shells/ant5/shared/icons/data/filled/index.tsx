import React from "react";
import { IIconCategory } from "../../model";
import { directional } from "./directional";
import { editor } from "./editor";
import { suggested } from "./suggested";

export const filledIcons: IIconCategory = {
  name: "Filled",
  icon: <span role="img" className="anticon">
    <svg width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" viewBox="0 0 1024 1024">
      <path d="M864 64H160C107 64 64 107 64 160v704c0 53 43 96 96 96h704c53 0 96-43 96-96V160c0-53-43-96-96-96z"></path>
    </svg></span>,
  iconGroups: [directional, suggested, editor]
}