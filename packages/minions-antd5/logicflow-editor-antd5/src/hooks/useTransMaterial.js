import { useCallback } from "react";
import { useTrans } from "./useTrans";
export function useTransMaterial() {
    const trans = useTrans();
    const translateMaterial = useCallback((material) => {
        const ports = {
            inPorts: [],
            outPorts: []
        };
        for (const port of material.defaultPorts?.inPorts || []) {
            ports.inPorts?.push({ ...port, label: trans(port.label) });
        }
        for (const port of material.defaultPorts?.outPorts || []) {
            ports.outPorts?.push({ ...port, label: trans(port.label) });
        }
        return { ...material, label: trans(material.label) || "", defaultPorts: ports };
    }, [trans]);
    return translateMaterial;
}
