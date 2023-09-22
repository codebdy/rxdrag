import { useContext } from "react";
import { HistoryContext } from "../contexts";

export function useHistoryState() {
  return useContext(HistoryContext)
}