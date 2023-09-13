export const boxShadow = "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px"
export const defaultHorizontalMargin = 8;
export const defaultVerticalMargin = 8;

let seed = 1

export function createId() {
  seed++;
  return seed;
}