export default class Inflect {
  demodulize(string : string) : string {
    const delimiter = '::';
    const index = string.lastIndexOf(delimiter);
    return index >= 0 ? string.substring(index + delimiter.length) : string;
  }
}
