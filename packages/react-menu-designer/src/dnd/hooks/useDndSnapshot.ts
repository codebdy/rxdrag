import { useContext } from "react";
import { DndSnapshotContext } from "../contexts";

export function useDndSnapshot() {
  return useContext(DndSnapshotContext)
}