import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { ReactElement } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { UsersList } from "@f/user_management";

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
      <UsersList />
    </div>
  );
}
