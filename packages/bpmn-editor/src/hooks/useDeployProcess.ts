import { gql } from "enthooks";
import { useCallback } from "react";
import { ID } from "shared";
import { RequestOptions, useLazyRequest } from "enthooks/hooks/useLazyRequest";

const deployGql = gql`
  mutation ($id:ID!) {
    deployProcess (id:$id)
  }
`;

export function useDeployProcess(
  id: ID,
  options?: RequestOptions<ID>
): [
    () => void,
    { loading: boolean|undefined; error: Error | undefined }
  ] {

  const [doDeploy, { loading, error }] = useLazyRequest(options)

  const deploy = useCallback(() => {
    doDeploy(id ? deployGql : undefined, { id })
  }, [id, doDeploy]);

  return [deploy, { loading, error }];
}
