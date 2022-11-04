import { ApolloProvider } from "@apollo/client";

import { getWebClient } from "./client";

import { GraphQlClientProviderProps } from "./types";

export function GraphQlClientProvider(props: GraphQlClientProviderProps) {
  const { children } = props;

  return <ApolloProvider client={getWebClient()}>{children}</ApolloProvider>;
}
