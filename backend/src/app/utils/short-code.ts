const BASE62 =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function encodeBase62(value: number): string {
  if (!Number.isInteger(value) || value < 0) {
    throw new Error('encodeBase62 expects a non-negative integer');
  }
  if (value === 0) {
    return BASE62[0];
  }

  let n = value;
  let encoded = '';
  while (n > 0) {
    encoded = BASE62[n % 62] + encoded;
    n = Math.floor(n / 62);
  }
  return encoded;
}

export function shortCodeFromId(id: number): string {
  return encodeBase62(id).slice(-6);
}
