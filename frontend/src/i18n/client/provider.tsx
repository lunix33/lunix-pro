"use client";

import { createContext, useMemo } from "react";
import ClientI18n from "./i18n";

import I18NProviderProps from "./types";

export const I18nContext = createContext<ClientI18n | undefined>(undefined);

export default function I18nProvider({ config, children }: I18NProviderProps) {
  const i18n = useMemo(() => {
    return ClientI18n.init(config) as ClientI18n;
  }, [config]);

  return <I18nContext.Provider value={i18n}>{children}</I18nContext.Provider>;
}
