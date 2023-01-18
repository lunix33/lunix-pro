import { I18nConfig } from "../types";

export type I18nMiddlewareOptions = Pick<
  I18nConfig,
  "supportedLanguages" | "defaultLanguage"
>;
