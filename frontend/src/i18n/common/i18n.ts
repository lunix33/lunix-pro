import i18next, { InitOptions } from "i18next";

import { I18nNotInitiatedError } from "./errors";
import { I18nConfig } from "./types";

export const DEFAULT_NAMESPACE = "common";

export default abstract class I18n<C extends I18nConfig> {
  protected static ready: (_v: I18n<any>) => void;
  protected static pendingGet: Promise<I18n<any>> = new Promise((resolve) => {
    I18n.ready = resolve;
  });
  protected static global: I18n<any> | null = null;

  static get<C extends I18nConfig = any>(): Promise<I18n<C>> {
    if (I18n.global == null) return this.pendingGet;

    return Promise.resolve(I18n.global as I18n<C>);
  }

  static init<C extends I18nConfig, K extends I18n<C>>(
    this: new (_c: C) => K,
    config: C
  ): Promise<K> | K {
    I18n.global = new this(config);
    I18n.ready(I18n.global);
    return I18n.global.init() as Promise<K> | K;
  }

  protected i18n: typeof i18next;
  readonly defaultLanguage: string;
  readonly language: string;
  readonly ns: string;
  readonly debug: boolean;

  constructor(config: C) {
    this.defaultLanguage = config.defaultLanguage;
    this.language = config.language ?? config.defaultLanguage;
    this.ns = config.ns ?? DEFAULT_NAMESPACE;
    this.debug = config.debug ?? false;

    const i18nextConfig = this._toLibConfig();
    this.i18n = i18next.createInstance(i18nextConfig);
  }

  abstract init(): Promise<I18n<C>> | I18n<C>;

  _toLibConfig(): InitOptions {
    return {
      lng: this.language ?? this.defaultLanguage,
      fallbackLng: this.defaultLanguage,
      defaultNS: this.ns,
      debug: this.debug,
    };
  }

  t(key: string, ns?: string) {
    if (this.i18n == null) throw new I18nNotInitiatedError();
    return this.i18n.t(key, { ns });
  }
}
