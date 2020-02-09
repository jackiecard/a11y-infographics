import {kebab} from './kebab';

export function styleString(style, coordinates) {
  return Object.entries(style).reduce((styleString, [propName, propValue]) => {
    return `${styleString}${kebab(propName)}:${propValue}${coordinates ? '%' : ''};`;
  }, '');
}
