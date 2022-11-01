/* eslint-disable @next/next/no-css-tags */
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link href="/fontawesome-free/css/fontawesome.css" rel="stylesheet" />
        <link href="/fontawesome-free/css/regular.css" rel="stylesheet" />
        <link href="/fontawesome-free/css/solid.css" rel="stylesheet" />
        <link href="/fontawesome-free/css/brands.css" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
