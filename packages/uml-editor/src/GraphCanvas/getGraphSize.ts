export function getGraphSize():{width:number, height:number}{
  const containerDiv = document.getElementById('container')||undefined;
  const size = {
    width: containerDiv?.getBoundingClientRect().width||800,
    height: containerDiv?.getBoundingClientRect().height||600 - 10,
  }

  return size;
}