export function first(array: any[]) {
  if (array.length > 0) {
    return array[0];
  }
}

export function last(array: any[]) {
  if (array.length > 0) {
    return array[array.length - 1];
  }
}

export function before(refence: any, array?: any[]) {
  if (!array) {
    return undefined;
  }
  for (let i = 0; i < array.length; i++) {
    if (array[i] === refence && i > 0) {
      return array[i - 1];
    }
  }
}

export function after(refence: any, array: any[]) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === refence && i < array.length) {
      return array[i + 1];
    }
  }
}

export function insertBefore(child: any, refence: any, array: any[]) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === refence) {
      array.splice(i, 0, child);
      return;
    }
  }

  array.push(child);
}

export function insertAfter(child: any, refence: any, array: any[]) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === refence) {
      array.splice(i + 1, 0, child);
      return;
    }
  }
}

export function remove(node: any, array: any[]) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === node) {
      array.splice(i, 1);
      break;
    }
  }

  return array;
}

export function batchRemove(nodes: any[], array: any[]) {
  for (let i = 0; i < nodes.length; i++) {
    remove(nodes[i], array);
  }
}

export function add(node: any, array: any[]) {
  if (!contains(node, array)) {
    array.push(node);
  }
}

export function contains(node: any, array: any[]) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === node) {
      return true;
    }
  }

  return false;
}

export function toggle(node: any, array: any[]) {
  if (contains(node, array)) {
    remove(node, array);
  } else {
    add(node, array);
  }
}

export function clear(array: any[]) {
  array.length = 0;
}

export function exchange(first: any, second: any, array: any[]) {
  const rtArray = [...array];
  const firstIndex = indexOf(first, array);
  const secondIndex = indexOf(second, array);
  rtArray[firstIndex] = second;
  rtArray[secondIndex] = first;
  return rtArray;
}

export function indexOf(node: any, array: any[]) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === node) {
      return i;
    }
  }

  return -1;
}
