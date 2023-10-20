import { useEffect } from "react";

export function useExplorerScrollbarHide(){
  //禁止浏览器滚动，解决x6会增加浏览器滚动条的bug
  useEffect(()=>{
    const oldValue = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return ()=>{
      document.body.style.overflow = oldValue;
    }
  },[])
}