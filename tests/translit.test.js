import { describe, expect, it } from "vitest";
import { translit } from "../src/translit.js";
import { mapObjectToUpperCase, lowerCaseWords } from "./scaffolding.js";

describe("Module tests:\n", () => {
  let testCase = {
    "ji": "ї",
    "ŷ": "ы",
    "Ji": "Ї",

    ...lowerCaseWords,
    ...mapObjectToUpperCase(lowerCaseWords),
  };

  Object.keys(testCase).forEach((key) => {
    it("Lat → Cyr:\n", () => {
      expect(translit(key, "latCyr")).toBe(testCase[key]);
    });
    it("Lat → Lat (no change):\n", () => {
      expect(translit(key, "cyrLat")).toBe(key);
    });
    it("Lat → Cyr → Lat (no change):\n", () => {
      expect(translit(translit(key, "latCyr"), "cyrLat")).toBe(key);
    });
    it("Cyr → Lat:\n", () => {
      expect(translit(testCase[key], "cyrLat")).toBe(key);
    });
    it("Cyr → Cyr (no change):\n", () => {
      expect(translit(testCase[key], "latCyr")).toBe(testCase[key]);
    });
    it("Cyr → Lat → Cyr (no change):\n", () => {
      expect(translit(translit(testCase[key], "cyrLat"), "latCyr")).toBe(
        testCase[key],
      );
    });
  });
});
