import { ReactNode } from "react";

import { I18nConfig } from "../common";

export default interface I18NProviderProps {
  config: ClientI18nConfig;
  children: ReactNode;
}

export interface ClientI18nConfig extends I18nConfig {
  resources: I18nResource;
}

export interface I18nResource {
  [language: string]: I18nResourceLanguage;
}

export interface I18nResourceLanguage {
  [namespace: string]: I18nResourceKey;
}

export type I18nResourceKey =
  | string
  | {
      [key: string]: any;
    };
