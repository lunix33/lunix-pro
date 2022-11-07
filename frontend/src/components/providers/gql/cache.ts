import { InMemoryCache } from "@apollo/client";

const _mergePagedQuery = (
  existing: any = { count: 0, data: [] },
  incoming: any,
  { args }: { args: Record<string, any> | null }
) => {
  const isPaged = args?.page != null;
  if (!isPaged) return incoming;

  const { offset } = args?.page;
  const merged = [...existing.data];
  incoming.data.forEach((v: any, i: number) => {
    merged[offset + i] = v;
  });

  return { ...incoming, data: merged };
};

export const cache = new InMemoryCache({
  typePolicies: {
    UsersQuery: {
      fields: {
        getUsers: {
          keyArgs: false,
          merge: (_existing, incoming) => incoming,
        },
      },
    },
    GroupsQuery: {
      fields: {
        getGroups: {
          keyArgs: false,
          merge: (_existing, incoming) => incoming,
        },
      },
    },
  },
});
