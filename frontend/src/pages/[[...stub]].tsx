import { useRouter } from "next/router";
import type { ReactElement } from "react";

export default function Page(): ReactElement | null {
  const {
    query: { stub = ["home"] },
  } = useRouter();

  return <div>Page: {JSON.stringify(stub)}</div>;
}
