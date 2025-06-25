export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isNotEmpty(value: string): boolean {
  return value.trim().length > 0;
}

export function hasMinLength(value: string, length: number): boolean {
  return value.trim().length >= length;
}

export function isEqualToOtherValue(value: string, other: string): boolean {
  return value === other;
}
