import NextApp, { AppInitialProps, AppProps, AppContext } from "next/app";
import { ThemeProvider } from "@emotion/react";
import { appWithTranslation } from "next-i18next";
import { getCookie } from "cookies-next";

import GraphQlClientProvider from "@c/providers/gql";
import Global from "@c/layouts/global";
import Header from "@c/layouts/header";
import Main from "@c/layouts/main";
import Footer from "@c/layouts/footer";
import * as themeRoot from "@t";

import "reset-css";

interface CustomProps {
  themeStr: string;
}

function App({ Component, pageProps, themeStr }: AppProps & CustomProps) {
  const theme = (themeRoot as any)[themeStr];

  return (
    <GraphQlClientProvider>
      <ThemeProvider theme={theme}>
        <Global>
          <Header />
          <Main>
            <Component {...pageProps} />
          </Main>
          <Footer />
        </Global>
      </ThemeProvider>
    </GraphQlClientProvider>
  );
}

App.getInitialProps = async (
  ctx: AppContext
): Promise<AppInitialProps & CustomProps> => {
  const {
    ctx: { req, res },
  } = ctx;
  const themeCookie = getCookie("theme", { req, res });
  const theme =
    typeof themeCookie === "string" &&
    themeRoot.validThemes.includes(themeCookie)
      ? themeCookie
      : "light";

  return {
    ...(await NextApp.getInitialProps(ctx)),
    themeStr: theme,
  };
};

export default appWithTranslation(App);
