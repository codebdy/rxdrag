export function first(array) {
  if (array.length > 0) {
    return array[0];
  }
}

export function last(array) {
  if (array.length > 0) {
    return array[array.length - 1];
  }
}

export function before(refence, array) {
  if (!array) {
    return undefined;
  }
  for (var i = 0; i < array.length; i++) {
    if (array[i] === refence && i > 0) {
      return array[i - 1];
    }
  }
}

export function after(refence, array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] === refence && i < array.length) {
      return array[i + 1];
    }
  }
}

export function insertBefore(child, refence, array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] === refence) {
      array.splice(i, 0, child);
      return;
    }
  }

  array.push(child);
}

export function insertAfter(child, refence, array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] === refence) {
      array.splice(i + 1, 0, child);
      return;
    }
  }
}

export function remove(node, array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] === node) {
      array.splice(i, 1);
      break;
    }
  }

  return array;
}

export function batchRemove(nodes, array) {
  for (var i = 0; i < nodes.length; i++) {
    remove(nodes[i], array);
  }
}

export function add(node, array) {
  if (!contains(node, array)) {
    array.push(node);
  }
}

export function contains(node, array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] === node) {
      return true;
    }
  }

  return false;
}

export function toggle(node, array) {
  if (contains(node, array)) {
    remove(node, array);
  } else {
    add(node, array);
  }
}

export function clear(array) {
  array.length = 0;
}

export function exchange(first, second, array) {
  let rtArray = [...array];
  let firstIndex = indexOf(first, array);
  let secondIndex = indexOf(second, array);
  rtArray[firstIndex] = second;
  rtArray[secondIndex] = first;
  return rtArray;
}

export function indexOf(node, array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] === node) {
      return i;
    }
  }

  return -1;
}
