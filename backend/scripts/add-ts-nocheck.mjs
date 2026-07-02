// Prepends `// @ts-nocheck` to generated tabbycat-client files so they are
// skipped by `tsc --noEmit` (they don't compile under noImplicitAny).
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('../tabbycat-client/out', import.meta.url).pathname;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) return walk(path);
      return entry.name.endsWith('.ts') ? [path] : [];
    }),
  );
  return files.flat();
}

const banner = '// @ts-nocheck\n';
let patched = 0;
for (const file of await walk(root)) {
  const content = await readFile(file, 'utf8');
  if (content.startsWith(banner)) continue;
  await writeFile(file, banner + content);
  patched++;
}
console.log(`add-ts-nocheck: patched ${patched} file(s)`);
