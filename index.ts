/**
 * Main inflector class
 * TODO describe interface first
 */
import dictionary from './dictionary';

export default class Inflect {
  // returns the last part of a namespace, e.g. 'Foo::Bar::Baz' => 'Baz'
  static demodulize(string: string): string {
    const delimiter = '::';
    const index = string.lastIndexOf(delimiter);
    return index >= 0 ? string.substring(index + delimiter.length) : string;
  }

  // returns camelcase version of a string
  static camelize(string: string, lowercaseFirstLetter?: boolean): string {
    let result = lowercaseFirstLetter ?
      string[0].toLowerCase() + string.substr(1) : string[0].toUpperCase() + string.substr(1);
    return result.replace(/[_.-](\w|$)/g, (_: string, l: string) =>
      l.toUpperCase()
    );
  }

  // replaces all underscores with dashes
  static dasherize(string: string): string {
    return string.replace(/_/g, '-');
  }

  // returns number suffix for ordered lists, e.g. 6 => 'th'
  static ordinal(number: number): string {
    const absNumber: number = Math.floor(Math.abs(number));

    if ([11, 12, 13].indexOf(absNumber % 100) !== -1) {
      return 'th';
    } else {
      switch (absNumber % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    }
  }

  // returns number with suffix for ordered lists, e.g. 21 => '21st'
  static ordinalize(number: number): string {
    return `${number}${this.ordinal(number)}`;
  }

  // makes an underscored, lowercase form from the expression in the string
  static underscore(string: string): string {
    if (!/[A-Z-]|::/g.test(string)) { return string; }
    let result = string.replace(/::/g, '/');
    result = result.replace(/([A-Z\d]+)([A-Z][a-z])/g, '$1_$2');
    result = result.replace(/([a-z\d])([A-Z])/g, '$1_$2');
    result = result.replace(/-/g, '_');
    return result.toLowerCase();
  }

  // generates valid foreign key fo DB for given name
  static foreignKey(string: string): string {
    return `${this.underscore(this.demodulize(string))}_id`;
  }

  // pluralizes word
  static pluralize(string: string): string {
    let word = string.toLowerCase();
    if (dictionary.irregularPlurals.hasOwnProperty(word)) {
      return this.convertCase(dictionary.irregularPlurals[word], string);
    }
    if (dictionary.uncountables.indexOf(word) !== -1) {
      return this.convertCase(word, string);
    }
    const foundInUncountables = dictionary.uncountableRegex.some((regex: RegExp) => {
      if (regex.test(word)) {
        return true;
      }
    });
    if (!foundInUncountables) {
      dictionary.pluralRegex.some((rule: [RegExp, string]) => {
        if ((rule[0]).test(word)) {
          word = word.replace(rule[0], rule[1]);
          return true;
        }
      });
    }
    return this.convertCase(word, string);
  }

  // singularizes word
  static singularize(string: string): string {
    let word = string.toLowerCase();
    for(let key in dictionary.irregularPlurals) {
      if (dictionary.irregularPlurals[key] === word) {
        return this.convertCase(key, string);
      }
    }

    dictionary.singularRegex.some((rule: [RegExp, string]) => {
      if ((rule[0]).test(word)) {
        word = word.replace(rule[0], rule[1]);
        return true;
      }
    });
    return this.convertCase(word, string);
  }

  // creates class name from a plural table name
  static classify(string: string): string {
    return this.camelize(this.singularize(string.replace(/.*\./, '')));
  }

  // preserves original case given in pattern
  private static convertCase(string: string, pattern: string): string {
    let result = '';
    if (pattern === pattern.toUpperCase()) {
      return string.toUpperCase();
    }

    for (let i = 0; i < string.length; i++) {
      let c = string.charAt(i);
      let p = pattern.charAt(i);

      if (p && p === p.toUpperCase()) {
        result += c.toUpperCase();
      } else {
        result += c.toLowerCase();
      }
    }
    return result;
  }


}
