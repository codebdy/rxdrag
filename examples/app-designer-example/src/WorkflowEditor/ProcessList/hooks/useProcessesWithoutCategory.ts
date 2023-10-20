import { useMemo } from "react";
import { IProcess, IProcessCategory } from "../../../interfaces/process";
export function useProcessesWithoutCategory(categories?:IProcessCategory[], processes?:IProcess[]) {

  const processessWithoutCategory = useMemo(() => {
    const pcs = [];
    for (const process of processes || []) {
      if (!categories?.find(category => category.id === process.categoryId)) {
        pcs.push(process)
      }
    }

    return pcs;
  }, [categories, processes])

  return processessWithoutCategory;
}