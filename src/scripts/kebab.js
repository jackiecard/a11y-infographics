export function kebab (prop) {
  return prop.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
};