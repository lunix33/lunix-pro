import { InferPartialServerI18nConfig } from "./server";

export const configuration = {
  defaultLanguage: "en",
  supportedLanguages: ["en", "fr"],
  debug: process.env.NODE_ENV === "development",
} as InferPartialServerI18nConfig;
