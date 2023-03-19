import { IIconCategory } from "../model";
import { filledIcons } from "./filled";
import { outlinedIcons } from "./outlined";
import { twoToneIcons } from "./two-tone";

export const iconCategories: IIconCategory[] = [
  outlinedIcons, filledIcons, twoToneIcons
]

export function getIcon(key: string) {
  for (const category of iconCategories) {
    for (const group of category.iconGroups) {
      for (const icon of group.icons) {
        if (icon.iconKey === key) {
          return icon;
        }
      }
    }
  }
}

export function findIcons(keyword: string, categoryName?: string) {
  const icons = [];
  for (const category of iconCategories) {
    if (categoryName === category.name || !categoryName) {
      for (const group of category.iconGroups) {
        const fundIcons = group.icons.filter(icon => (icon.iconKey.indexOf(keyword) > -1 || (icon.keywords?.indexOf(keyword)||0) > -1))
        icons.push(...fundIcons);
      }
    }
  }

  return icons;
}