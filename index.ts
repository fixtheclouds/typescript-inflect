/**
 * Main inflector class
 * TODO describe interface first
 */
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
      switch(absNumber % 10) {
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
}
