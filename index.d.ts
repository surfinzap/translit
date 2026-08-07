/**
 * The direction of transliteration.
 * - `latCyr` — Latin alphabet → Cyrillic script
 * - `cyrLat` — Cyrillic script → Latin alphabet
 */
export type TranslitDirection = "latCyr" | "cyrLat";

/**
 * Transliterates a string between the Latin alphabet and the Cyrillic script.
 *
 * @param string - The input string to be transliterated.
 * @param direction - The direction of transliteration.
 * @returns The transliterated string.
 * @throws {Error} If `direction` is neither `latCyr` nor `cyrLat`.
 *
 * @example
 * translit("Коровкы", "cyrLat"); // "Korovkŷ"
 * translit("Korovkŷ", "latCyr"); // "Коровкы"
 */
export function translit(string: string, direction: TranslitDirection): string;
