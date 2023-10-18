import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { classesState, relationsState, diagramsState, x6NodesState, x6EdgesState, packagesState, changedState, graphLogicsState, scriptLogicsState, apisState, codesState } from "../recoil/atoms";
import { ID } from "shared";
import { MetaContent } from "../meta";

export function useParesMeta(meta: MetaContent | undefined, metaId: ID) {
  const setClasses = useSetRecoilState(classesState(metaId));
  const setRelations = useSetRecoilState(relationsState(metaId));
  const setDiagrams = useSetRecoilState(diagramsState(metaId));
  const setScriptLogics = useSetRecoilState(scriptLogicsState(metaId));
  const setGraphLogics = useSetRecoilState(graphLogicsState(metaId));
  const setCodes = useSetRecoilState(codesState(metaId));
  const setApis = useSetRecoilState(apisState(metaId));
  const setX6Nodes = useSetRecoilState(x6NodesState(metaId));
  const setX6Edges = useSetRecoilState(x6EdgesState(metaId));
  const setPackages = useSetRecoilState(packagesState(metaId))
  const setChanged = useSetRecoilState(changedState(metaId))

  useEffect(() => {
    setPackages(meta?.packages || []);
    setClasses(meta?.classes || []);
    setRelations(meta?.relations || []);
    setDiagrams(meta?.diagrams || []);
    setCodes(meta?.codes ||[]);
    setScriptLogics(meta?.scriptLogics || []);
    setGraphLogics(meta?.graphLogics || []);
    setApis(meta?.apis || []);
    setX6Nodes(meta?.x6Nodes || []);
    setX6Edges(meta?.x6Edges || []);
    setChanged(false);
  }, [setDiagrams, setClasses, setPackages, setRelations, setX6Edges, setX6Nodes, meta, setChanged, setScriptLogics, setGraphLogics, setApis, setCodes]);

}
