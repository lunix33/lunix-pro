import { ReactElement } from "react";

import { UserDetail } from "@f/user_management";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getServerSideProps({
  locale,
}: GetServerSidePropsContext): Promise<GetServerSidePropsResult<{}>> {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common", "admin"])),
    },
  };
}

export default function UserPage(): ReactElement {
  return <UserDetail />;
}
