import { useEffect, useRef } from "react";

export function useMountRef(){
  const mountRef = useRef<boolean>(false);

  useEffect(() => {
    mountRef.current = true;
    return () => {
      mountRef.current = false;
    };
  }, []);

  return mountRef;
}