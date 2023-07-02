import { useMemo } from "react";
import { useTransMaterial } from "./useTransMaterial";
import { useTrans } from "./useTrans";
export function useTransMaterialCategorys(categories) {
    const t = useTransMaterial();
    const tran = useTrans();
    const rt = useMemo(() => {
        return categories.map(category => ({ ...category, name: tran(category.name) || category.name, materials: category.materials?.map(material => t(material)) }));
    }, [categories, t, tran]);
    return rt;
}
