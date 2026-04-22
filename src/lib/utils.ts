/**
 * Join classnames conditionally. No Tailwind merge — plain concatenation.
 *
 * Accepts strings, numbers, objects (`{ "a": true, "b": false }`),
 * arrays (recursively), and falsy values (which are ignored).
 *
 * @example
 *   cn("btn", size === "lg" && "btn--lg", { "btn--disabled": isDisabled })
 */
export type ClassValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | ClassDict
  | ClassValue[];

export interface ClassDict {
  [key: string]: boolean | null | undefined;
}

export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];

  for (const input of inputs) {
    if (!input && input !== 0) continue;

    if (typeof input === "string" || typeof input === "number") {
      out.push(String(input));
      continue;
    }

    if (Array.isArray(input)) {
      const nested = cn(...input);
      if (nested) out.push(nested);
      continue;
    }

    if (typeof input === "object") {
      for (const key in input) {
        if (input[key]) out.push(key);
      }
    }
  }

  return out.join(" ");
}
