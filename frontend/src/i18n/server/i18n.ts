import path from "node:path";
import { InitOptions } from "i18next";
import fsBackend from "i18next-fs-backend/esm";

import I18n, { DEFAULT_NAMESPACE } from "../common";
import { ServerI18nConfig } from "./types";
import { ClientI18nConfig } from "../client/types";

const DEFAULT_LOAD_PATH = path.resolve(
  process.cwd(),
  "./locales/{{lng}}/{{ns}}.yml"
);
const DEFAULT_MISSING_PATH = path.resolve(
  process.cwd(),
  "./locales/{{lng}}/{{ns}}.missing.yml"
);

export default class ServerI18n extends I18n<ServerI18nConfig> {
  readonly requiredNamespaces;
  readonly supportedLanguages;

  constructor(config: ServerI18nConfig) {
    super(config);

    this.requiredNamespaces = config.requiredNamespaces ?? [DEFAULT_NAMESPACE];
    this.supportedLanguages = config.supportedLanguages;
  }

  async init(): Promise<ServerI18n> {
    if (!this.i18n.isInitialized) {
      this.i18n.use(fsBackend);
      await this.i18n.init(this._toLibConfig());
    }

    return this;
  }

  _toLibConfig(): InitOptions {
    return {
      ...super._toLibConfig(),
      supportedLngs: this.supportedLanguages,
      ns: this.requiredNamespaces,
      backend: {
        loadPath: DEFAULT_LOAD_PATH,
        addPath: DEFAULT_MISSING_PATH,
      },
    };
  }

  ssrConfig(): ClientI18nConfig {
    return {
      debug: this.debug,
      defaultLanguage: this.defaultLanguage,
      language: this.language,
      ns: this.ns,
      resources: this.i18n.services.resourceStore.data,
    };
  }
}
