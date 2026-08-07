import { chars, mapping } from "./constants.js";

/** 
  Identify apostrophe candidates around 'hardConsonants' and 'digraphs' and normalize them with the (8217)

  Inputs
  '  (39)     dumb single quote
  ‘  (8216)   left single quotation mark
  ’  (8217)   right single quotation mark
  ʼ  (700)    modifier letter apostrophe; https://en.wikipedia.org/wiki/Modifier_letter_apostrophe [1]
  ‛  (8219)   single high-reversed-9 quotation mark
  ´  (180)    acute accent
  `  (96)     grave accent
  ′  (8242)   prime

  Output
  ’  (8217)		right single quotation mark
  (In theory, the output should be (700), however (700) is often not included in fonts, so the 8217 is a viable alternative)

  Normalizes apostrophes to a consistent character in the given string.
  @param {string} string - The input string containing text with various apostrophe forms.
  @returns {string} - The string with normalized apostrophes.
*/
export function normalizeApostrophes(string) {
  const accentChars = "'’ʼ‘‛´`′";

  // match hard consonants
  string = string.replace(
    new RegExp("([csrzž])" + "([" + accentChars + "])" + "([aeiou])", "gi"),
    "$1’$3",
  );

  // match ending accents
  string = string.replace(
    new RegExp("([csrzž])" + "([" + accentChars + "])" + "(\\B)", "gi"),
    "$1’$3",
  );

  // match starting accents
  string = string.replace(
    new RegExp("(\\B)" + "([" + accentChars + "])" + "([o])", "gi"),
    "$1’$3",
  );

  return string;
}

/**
 * Normalize stray homoglyphs on a per-word basis.
 *
 * For direction "latCyr": if a word is mostly Latin letters,
 * then convert any stray Cyrillic homoglyphs to their Latin equivalent.
 *
 * For direction "cyrLat": if a word is mostly Cyrillic,
 * then convert any stray Latin homoglyphs to their Cyrillic equivalent.
 *
 * @param {string} text - The input text.
 * @param {string} direction - "latCyr" or "cyrLat".
 * @returns {string} - The text with per-word homoglyph fixes.
 */

export function normalizeHomoglyphs(text, direction) {
  const LETTER_REGEX = new RegExp(`[${chars.lowerCase}]+`, "giu");
  const LATIN_REGEX = new RegExp(`[${chars.latinLowerCase}]`, "giu");
  const CYRILLIC_REGEX = new RegExp(`[${chars.cyrillicLowerCase}]`, "giu");

  return text.replace(LETTER_REGEX, (word) => {
    const latCount = (word.match(LATIN_REGEX) || []).length;
    const cyrCount = (word.match(CYRILLIC_REGEX) || []).length;
    let transformDirection;

    if (direction === "latCyr") {
      transformDirection = cyrCount <= latCount ? "cyrLat" : "latCyr";
    } else if (direction === "cyrLat") {
      transformDirection = cyrCount >= latCount ? "latCyr" : "cyrLat";
    }

    return applyTranslitRule(word, mapping.homoglyphs, transformDirection);
  });
}

/**
 * Applies a transliteration mapping rule to a string, replacing patterns
 * based on the specified direction (Cyrillic to Latin or Latin to Cyrillic).
 *
 * @param {string} string - The input string to be transliterated.
 * @param {Object} mappingRule - An object containing the transliteration rules.
 * @param {string} direction - The direction of transliteration.
 * Use "cyrLat" for Cyrillic to Latin, and "latCyr" for Latin to Cyrillic.
 *
 * @returns {string} - The transliterated string with applied rules.
 */
export function applyTranslitRule(string, mappingRule, direction) {
  if (direction === "cyrLat") {
    for (const rule in mappingRule) {
      let re = new RegExp(mappingRule[rule], "g");
      string = string.replace(re, rule);
    }
  } else if (direction === "latCyr") {
    for (const rule in mappingRule) {
      let re = new RegExp(rule, "g");
      string = string.replace(re, mappingRule[rule]);
    }
  }
  return string;
}
