import React from "react";


export interface IPredefinedIcon {
  iconKey: string;
  icon: React.FC<any>;
  keywords?: string;
}
export interface IIconGroup {
  name: string;
  icons: IPredefinedIcon[];
}

export interface IIconCategory {
  name: string;
  icon?: React.ReactElement;
  iconGroups: IIconGroup[];
}
