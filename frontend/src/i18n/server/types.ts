import { I18nConfig, InferPartialI18nConfig } from "../common";

export interface ServerI18nConfig extends I18nConfig {
  requiredNamespaces: string[];
  supportedLanguages: string[];
}

export type InferPartialServerI18nConfig =
  InferPartialI18nConfig<ServerI18nConfig>;
