import { normalizeHomoglyphs } from "./utils.js";
import { processUpperCase } from "./upper_case.js";
import * as latCyr from "./lat_to_cyr.js";
import * as cyrLat from "./cyr_to_lat.js";

/**
 * PUBLIC API
 * Transliterates a string between Latin and Cyrillic scripts based on the specified direction.
 *
 * @param {string} string - The input string to be transliterated.
 * @param {string} direction - The direction of transliteration.
 * Use "latCyr" to convert Latin to Cyrillic, and "cyrLat" to convert Cyrillic to Latin.
 *
 * @returns {string} - The transliterated string.
 */
export function translit(string, direction) {
  if (direction !== "latCyr" && direction !== "cyrLat") {
    throw new Error(`Unsupported direction: ${direction}`);
  }
  string = normalizeHomoglyphs(string, direction);
  string = processUpperCase(string, direction);

  const transform =
    direction === "latCyr"
      ? latCyr.applyTransformations
      : cyrLat.applyTransformations;

  return transform(string);
}
