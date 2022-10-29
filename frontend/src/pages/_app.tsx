import NextApp, { AppInitialProps } from "next/app";
import GraphQlClientProvider from "@c/providers/gql";
import ThemeProvider from "@c/providers/theme";
import Global from "@c/layouts/global";
import Header from "@c/layouts/header";
import Main from "@c/layouts/main";
import Footer from "@c/layouts/footer";
import type { AppProps, AppContext } from "next/app";

interface CustomProps {}

export default function App({ Component, pageProps }: AppProps & CustomProps) {
  return (
    <GraphQlClientProvider>
      <ThemeProvider>
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
  return {
    ...(await NextApp.getInitialProps(ctx)),
  };
};
