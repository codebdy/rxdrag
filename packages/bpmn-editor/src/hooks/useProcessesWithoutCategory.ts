import { useMemo } from "react";
import { useCategories } from "./useCategories";
import { useProcesses } from "./useProcesses";

export function useProcessesWithoutCategory() {
  const processes = useProcesses();
  const categories = useCategories();

  const processessWithoutCategory = useMemo(() => {
    const pcs = [];
    for (const process of processes || []) {
      if (!categories.find(category => category.uuid === process.categoryUuid)) {
        pcs.push(process)
      }
    }

    return pcs;
  }, [categories, processes])

  return processessWithoutCategory;
}