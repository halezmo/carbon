import I18n from "i18n-js";

/**
* I18n Helper
*
* Provides helper methods for I18n.
*
* @object I18nHelper
*/
const I18nHelper = {

  /**
   * Returns format from the defined translations.
   *
   * @method format
   * @param {String} locale overrides current locale
   * @return {Object} Format values for decimal and currency
   */
  format: (locale) => {
    return {
      delimiter: I18n.t("number.format.delimiter", { locale: locale, defaultValue: "," }),
      separator: I18n.t("number.format.separator", { locale: locale, defaultValue: "." }),
      unit: I18n.t("number.currency.format.unit", { locale: locale, defaultValue: '£' }),
      format: I18n.t("number.currency.format.format", { locale: locale, defaultValue: '%u%n' })
    };
  },

  /**
   * Adds formatting to the value
   *
   * @method formatDecimal
   * @param {String} valueToFormat unformatted Value
   * @param {Integer} precision
   * @return {String} formatted value
   */
  formatDecimal: (valueToFormat = 0, precision = 2) => {
    let format = I18nHelper.format();

    return  I18n.toNumber(valueToFormat, {
      precision: precision,
      delimiter: format.delimiter,
      separator: format.separator
    });
  },

  abbreviateCurrency: (num, options = {}) => {
    let locale = options.locale || 'en',
        sign = num < 0 ? '-' : '',
        abbr = I18nHelper.abbreviateNumber(num),
        format = I18nHelper.format(locale);
    return format.format.replace("%u", format.unit).replace("%n", abbr).replace("%s", sign);
  },

  /**
   * Abbreviates number with a `k` or `m` suffix depening on whether it's a thousand or a million
   * billions and above abbreviate with millions
   *
   * @method abbreviateNumber
   * @param {Number} number
   * @return {String} abbreviated number
   */
  abbreviateNumber: (num) => {
    if (num > 949 && num < 999950) {
      return `${Math.round(num / 100) / 10}${I18n.t("number.format.abbreviations.thousand", { defaultValue: "k" })}`;
    } else if (num > 999949) {
      return `${Math.round(num / 100000) / 10}${I18n.t("number.format.abbreviations.million", { defaultValue: "m" })}`;
    }

    return `${I18nHelper.formatDecimal(num)}`;
  },

  /**
   * Adds currency formatting to the value
   *
   * @method formatCurrency
   * @param {String} valueToFormat unformatted Value
   * @param {Object} options list of options to overide formatting from locale
   * @return {String} formatted value
   */
  formatCurrency: (valueToFormat = 0, options = {}) => {
    let locale = options['locale'] || 'en',
        format = I18nHelper.format(locale),
        precision = options['precision'] || 2,
        unit = options['unit'] || format.unit,
        structure = options['format'] || format.format;

    return  I18n.toCurrency(valueToFormat, {
      precision: precision,
      delimiter: format.delimiter,
      separator: format.separator,
      unit: unit,
      format: structure
    });
  },

  /**
   * Removes delimiters and separators from value
   *
   * @method unformatDecimal
   * @param {String} valueWithFormat Formatted value
   * @return {String} value with no format
   */
  unformatDecimal: (valueWithFormat = '') => {
    let format = I18nHelper.format(),
        regex = new RegExp('\\' + format.delimiter, "g");

    valueWithFormat = valueWithFormat.replace(regex, "", "g");

    return valueWithFormat.replace(format.separator, ".");
  }
};

export default I18nHelper;
