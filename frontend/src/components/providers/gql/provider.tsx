import { ApolloProvider } from "@apollo/client";
import { gqlClient } from "./client";
import type { GraphQlClientProviderProps } from "./types";

export function GraphQlClientProvider(props: GraphQlClientProviderProps) {
  const { children } = props;

  return <ApolloProvider client={gqlClient}>{children}</ApolloProvider>;
}
