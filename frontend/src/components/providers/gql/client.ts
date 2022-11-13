import {
  ApolloClient,
  createHttpLink,
  NormalizedCacheObject,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { cache } from "./cache";

let gqlClient: ApolloClient<NormalizedCacheObject> | undefined;
export function getWebClient(): ApolloClient<NormalizedCacheObject> {
  if (gqlClient == null) {
    const httpLink = createHttpLink({
      uri: "/api/",
    });
    const authLink = setContext((_, { headers: oldHeaders }) => {
      const token = localStorage.getItem("auth");
      const headers = token
        ? { ...oldHeaders, authorization: `Basic ${token}` }
        : oldHeaders;

      return { headers };
    });

    gqlClient = new ApolloClient({
      link: authLink.concat(httpLink),
      cache,
    });
  }
  return gqlClient;
}

export function getServerClient(): ApolloClient<NormalizedCacheObject> {
  if (gqlClient == null) {
    gqlClient = new ApolloClient({
      uri: "/api",
      cache,
    });
  }
  return gqlClient;
}
