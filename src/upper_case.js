import { chars } from "./constants.js";
import * as latCyr from "./lat_to_cyr.js";
import * as cyrLat from "./cyr_to_lat.js";

/**
  Identify UPPERCASE letters and transliterate them according to a mapping option

  - process upper case words with 2 or more letters
  - process single-letter uppercase word in case it is around uppercase words

  @param {string} string - text for mapping
  @param {string} direction - latCyr | cyrLat
  @returns {string} transliterated upper case text
*/
export function processUpperCase(string, direction) {
  let spacingChars = "-–—\\s";

  let multiCharUpperCaseWord =
    "([" + chars.upperCase + "’]{2,})" + "([^" + chars.lowerCase + "]|$)";
  let multiCharRegex = new RegExp(multiCharUpperCaseWord, "g");

  string = string.replace(multiCharRegex, function ($0, $1, $2) {
    switch (direction) {
      case "latCyr":
        return latCyr.applyTransformations($1.toLowerCase()).toUpperCase() + $2;
      case "cyrLat":
        return cyrLat.applyTransformations($1.toLowerCase()).toUpperCase() + $2;
    }
  });

  let singleCharBeforeUpperCase =
    "([^" +
    chars.upperCase +
    "’]|^)" +
    "([" +
    chars.upperCase +
    "’])" +
    "(?=[" +
    spacingChars +
    "][" +
    chars.upperCase +
    "][^" +
    chars.lowerCase +
    "’])";
  let singleCharBeforeRegex = new RegExp(singleCharBeforeUpperCase, "g");

  string = string.replace(singleCharBeforeRegex, function ($0, $1, $2) {
    switch (direction) {
      case "latCyr":
        return $1 + latCyr.applyTransformations($2.toLowerCase()).toUpperCase();
      case "cyrLat":
        return $1 + cyrLat.applyTransformations($2.toLowerCase()).toUpperCase();
    }
  });

  let singleCharAfterUpperCase =
    "([" +
    chars.upperCase +
    "’][\\s])" +
    "([" +
    chars.upperCase +
    "])" +
    "([^" +
    chars.upperCase +
    "]|$)";
  let singleCharAfterRegex = new RegExp(singleCharAfterUpperCase, "g");

  string = string.replace(singleCharAfterRegex, function ($0, $1, $2, $3) {
    switch (direction) {
      case "latCyr":
        return (
          $1 + latCyr.applyTransformations($2.toLowerCase()).toUpperCase() + $3
        );
      case "cyrLat":
        return (
          $1 + cyrLat.applyTransformations($2.toLowerCase()).toUpperCase() + $3
        );
    }
  });

  return string;
}
