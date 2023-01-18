import {
  NextRequest,
  NextResponse,
  NextMiddleware,
  NextFetchEvent,
} from "next/server";
import { pick } from "accept-language-parser";

import { I18nMiddlewareOptions } from "./types";

const STATIC_FILE = /\..+$/;
const ACCEPT_LANGUAGE_HEADER = "accept-language";

export default function i18nMiddleware(
  i18nconfig: I18nMiddlewareOptions,
  next: NextMiddleware = () => NextResponse.next()
): NextMiddleware {
  return (req: NextRequest, event: NextFetchEvent) => {
    const { pathname } = req.nextUrl;

    // Skip redirect on static files
    if (STATIC_FILE.test(pathname)) return next(req, event);

    // Skip redirect if already in localized path.
    const firstSegment = pathname.split("/")[1];
    if (i18nconfig.supportedLanguages.includes(firstSegment))
      return next(req, event);

    // Redirect to localized path.
    const selectedLanguage =
      pick(
        i18nconfig.supportedLanguages,
        req.headers.get(ACCEPT_LANGUAGE_HEADER) ?? "*",
        { loose: true }
      ) ?? i18nconfig.defaultLanguage;
    return NextResponse.redirect(
      new URL(`/${selectedLanguage}${pathname}`, req.url)
    );
  };
}
