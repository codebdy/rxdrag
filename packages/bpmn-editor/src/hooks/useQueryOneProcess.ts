import { gql, useQueryOne } from "enthooks";
import { useMemo } from "react";
import { IProcess } from "model/process";

const processGql = gql`
query ($id:ID!){
  oneProcess(where:{
    id:{
      _eq:$id
    }
  }){
    id
    name
    uuid
    categoryUuid
    xml
  }
}
`

export function useQueryOneProcess(id?: string) {
  const input = useMemo(() => (
    {
      gql: id && processGql,
      params: { id },
      depEntityNames: []
    }
  ), [id]);

  const { data, error, loading } = useQueryOne<IProcess>(input);

  return { process: data?.oneProcess, error, loading }
}