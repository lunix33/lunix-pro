import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
} from "next";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

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
