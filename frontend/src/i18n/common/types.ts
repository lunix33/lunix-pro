export interface I18nConfig {
  defaultLanguage: string;
  language: string;
  ns: string;
  debug: boolean;
}

export type InferPartialI18nConfig<C extends I18nConfig> = {
  [k in keyof C]: C[k];
};
