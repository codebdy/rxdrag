export function cloneObject(obj: any) {
  if(!obj){
    return obj
  }
  return JSON.parse(JSON.stringify(obj));
}
