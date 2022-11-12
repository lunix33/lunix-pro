import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { ReactElement } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Users from "@c/pages/admin/users";

export async function getServerSideProps({
  locale,
}: GetServerSidePropsContext): Promise<GetServerSidePropsResult<{}>> {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common", "admin"])),
    },
  };
}

export default function UsersPage(): ReactElement {
  return (
    <div css={{ padding: "1rem" }} className="hello">
      <Users />
    </div>
  );
}
