import GraphiQL from "graphiql";
import "graphiql/graphiql.css";
import { memo, useMemo } from "react";
import "./index.less";
import { createGraphiQLFetcher } from "@graphiql/toolkit";
import "./graphiql-dark-mode.css"

//例子連接
//https://github.com/graphql/graphiql/blob/main/packages/graphiql-toolkit/docs/create-fetcher.md#subscriptionurl
export const ApiBoard = memo(() => {
  // const realAppId = useEdittingAppId();
  // const token = useToken();
  // const endppoint = useEndpoint();
  const fetcher = useMemo(() => {
    const fetcher = createGraphiQLFetcher({
      url: "",
      // legacyWsClient: new SubscriptionClient(SERVER_SUBSCRIPTION_URL),
      // headers: {
      //   [HEADER_AUTHORIZATION]: token ? `${TOKEN_PREFIX}${token}` : "",
      //   [HEADER_LEDA_APPID]: realAppId,
      // }
    });

    return fetcher;
  }, []);

  return (
    <div className="api-board">
      <GraphiQL
        headerEditorEnabled
      fetcher={fetcher}
      // query=""
      />
    </div>
  );
});
