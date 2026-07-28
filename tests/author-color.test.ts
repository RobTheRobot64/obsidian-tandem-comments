import { describe, expect, it } from "vitest";
import { authorHue } from "../src/author-color";

describe("authorHue", () => {
  it("is stable across calls for the same author", () => {
    expect(authorHue("Leon")).toBe(authorHue("Leon"));
  });

  it("stays within the hue range for a variety of names", () => {
    const names = ["Leon", "Claude", "ChatGPT", "Gemini", "", "a", "ä", "🙂", "x".repeat(500)];
    for (const name of names) {
      const hue = authorHue(name);
      expect(Number.isInteger(hue)).toBe(true);
      expect(hue).toBeGreaterThanOrEqual(0);
      expect(hue).toBeLessThan(360);
    }
  });

  it("gives the example authors from the request distinct hues", () => {
    const hues = ["User", "Claude", "ChatGPT", "Gemini"].map(authorHue);
    expect(new Set(hues).size).toBe(hues.length);
  });

  it("separates names differing only in case or trailing space", () => {
    expect(authorHue("leon")).not.toBe(authorHue("Leon"));
    expect(authorHue("Leon ")).not.toBe(authorHue("Leon"));
  });

  it("spreads many authors across the wheel rather than clustering", () => {
    const hues = Array.from({ length: 200 }, (_, i) => authorHue(`author${i}`));
    // Twelve 30° buckets; a clustering hash would leave most of them empty.
    const buckets = new Set(hues.map((h) => Math.floor(h / 30)));
    expect(buckets.size).toBe(12);
  });
});
