import { LockContext } from "core-react/contexts";
import { useContext } from "react";

export function useLocked() {
  const locked = useContext<boolean | undefined>(LockContext)

  return locked
}