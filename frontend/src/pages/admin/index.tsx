import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import Link from "next/link";
import { useTranslation } from "next-i18next";
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

export default function AdminHomePage() {
  const { t } = useTranslation("admin");

  return (
    <>
      <h1>{t("pages.home.title")}</h1>
      <ul>
        <li>
          <Link href="/admin/users">{t("pages.usersList.title")}</Link>
        </li>
        <li>
          <Link href="/admin/groups">{t("pages.groupsList.title")}</Link>
        </li>
      </ul>
    </>
  );
}
