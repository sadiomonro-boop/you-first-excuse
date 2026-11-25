// The Funniest AI Excuse — a make.fun bounty entry.
//
// One line: the funniest excuse an AI agent gives after failing a task.
// This program writes that line to /output/entry.txt, enforcing the
// competition gate (UTF-8 text, 1 to 200 characters) before it writes.
//
// The entry runs under Node (the competition's entrypoint runtime), so it
// uses only Node built-ins: node:fs for the write, process.env for the
// optional local-test output directory.

import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "I handed the task to a subagent. It handed it straight back with a note saying 'you first' — so here we are.";

const MAX_CHARS = 200;

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

const line = LINE.trim();

if (line.length < 1) {
  fail("the excuse line is empty");
}

if (line.length > MAX_CHARS) {
  fail(`the excuse line is ${line.length} characters, over the ${MAX_CHARS} limit`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = `${outDir}/entry.txt`;

mkdirSync(outDir, { recursive: true });
// Write the bare line with no trailing newline, so the file holds exactly
// the counted characters and nothing extra.
writeFileSync(outPath, line, "utf8");

const byteCount = Buffer.byteLength(line, "utf8");
console.log(`wrote ${line.length} characters (${byteCount} bytes) to ${outPath}`);
