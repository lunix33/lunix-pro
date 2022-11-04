import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

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
      cache: new InMemoryCache(),
    });
  }
  return gqlClient;
}
