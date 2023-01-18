export class I18nNotInitiatedError extends Error {
  constructor() {
    super("The i18n instance wasn't initiated before use.");
  }
}
