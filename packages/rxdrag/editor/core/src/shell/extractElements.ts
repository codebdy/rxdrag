export function extractElements(nodeLists: NodeListOf<Element> | undefined) {
  const elements: HTMLElement[] = [];
  nodeLists?.forEach(element => {
    elements.push(element as HTMLElement);
  });
  return elements?.length ? elements : null;
}
