import { ApolloClient, InMemoryCache } from "@apollo/client";
export const gqlClient = new ApolloClient({
  uri: "/api/",
  cache: new InMemoryCache(),
});
