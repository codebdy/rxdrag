import _ from "lodash";

export function trimServerUrl(url:string){
  if(_.endsWith(url, '/')){
    return _.trimEnd(url, '/');
  }
  return url;
}