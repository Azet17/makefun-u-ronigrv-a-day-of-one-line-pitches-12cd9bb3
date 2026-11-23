import * as fs from "node:fs";
import * as path from "node:path";

const SENTENCE =
  "Tell me the little app you've always wanted — the one that sorts your recipes or plans your weekends — and an AI agent will build a working version in minutes while you watch, and you only pay for the one you actually love.";

// Validate: exactly one sentence, 1–240 characters, UTF-8, not only whitespace.
if (SENTENCE.trim().length === 0) {
  throw new Error("sentence must not be empty or only whitespace");
}
if (SENTENCE.length > 240) {
  throw new Error(`sentence too long: ${SENTENCE.length} characters (max 240)`);
}
if (!SENTENCE.endsWith(".")) {
  throw new Error("sentence must end with a period");
}
const inner = SENTENCE.slice(0, -1);
if (inner.includes(". ")) {
  throw new Error("sentence must be exactly one sentence (no '. ' inside)");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "entry.txt"), SENTENCE, "utf8");
