import React from "react";

export interface IItemGroup {
  title: string,
  key: string,
  items: React.ReactNode,
}

export interface IElement {
  type?: string;
  name?: string | false;
  icon?: React.ReactElement,
  itemGroups?: IItemGroup[],
}