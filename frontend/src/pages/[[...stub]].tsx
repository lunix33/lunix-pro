import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
} from "next";
import type { ReactElement } from "react";

interface PageProps {}

export async function getServerSideProps({
  locale,
}: GetServerSidePropsContext): Promise<GetServerSidePropsResult<PageProps>> {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
}

export default function Page(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
): ReactElement | null {
  console.log(props);
  const {
    query: { stub = ["home"] },
  } = useRouter();

  return <div>Page: {JSON.stringify(stub)}</div>;
}
