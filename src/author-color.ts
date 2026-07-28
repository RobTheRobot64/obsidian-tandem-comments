/** Stable hue (0–359) derived from an author name, so each author keeps one color. */
export function authorHue(author: string): number {
  let hash = 0;
  for (let i = 0; i < author.length; i++) {
    hash = (hash * 31 + author.charCodeAt(i)) | 0;
  }
  return Math.abs(hash) % 360;
}
