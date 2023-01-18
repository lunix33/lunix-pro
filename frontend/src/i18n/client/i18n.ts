import { InitOptions } from "i18next";
import I18n from "../common";
import { ClientI18nConfig, I18nResource } from "./types";

export default class ClientI18n extends I18n<ClientI18nConfig> {
  readonly resources: I18nResource;

  constructor(config: ClientI18nConfig) {
    super(config);

    this.resources = config.resources;
  }

  init(): ClientI18n {
    if (!this.i18n.isInitialized)
      this.i18n.init({ ...this._toLibConfig(), initImmediate: false });

    return this;
  }

  _toLibConfig(): InitOptions {
    return {
      ...super._toLibConfig(),
      resources: this.resources,
    };
  }
}
