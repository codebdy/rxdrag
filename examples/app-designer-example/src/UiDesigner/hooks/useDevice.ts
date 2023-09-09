import { useContext } from "react";
import { DeviceContext } from "../../contexts";

export function useDevice() {
  return useContext(DeviceContext)
}