import NextApp, { AppInitialProps } from "next/app";
import { ThemeProvider } from "@emotion/react";
import { getCookie } from "cookies-next";
import * as componentRoot from "@c";
import GraphQlClientProvider from "@c/providers/gql";
import Global from "@c/layouts/global";
import Header from "@c/layouts/header";
import Main from "@c/layouts/main";
import Footer from "@c/layouts/footer";
import type { AppProps, AppContext } from "next/app";
import type { Theme } from "@emotion/react";

import "reset-css";
import { appWithTranslation } from "next-i18next";

interface CustomProps {
  theme: Theme;
}

function App({ Component, pageProps, theme }: AppProps & CustomProps) {
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
    componentRoot.validThemes.includes(themeCookie)
      ? ((componentRoot as any)[themeCookie] as Theme)
      : componentRoot.light;

  return {
    ...(await NextApp.getInitialProps(ctx)),
    theme,
  };
};

export default appWithTranslation(App);
