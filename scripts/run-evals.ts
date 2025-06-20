import 'dotenv/config';
import { readdir } from 'fs/promises';
import { join } from 'path';
import { spawnSync } from 'child_process';

async function main() {
  const dir = join(__dirname, 'evals');
  const files = await readdir(dir);
  const evals = files.filter((f) => f.endsWith('.ts'));
  let failed = false;
  for (const file of evals) {
    console.log(`Running ${file}...`);
    const result = spawnSync('npx', ['tsx', join(dir, file)], {
      stdio: 'inherit',
    });
    if (result.status !== 0) {
      console.error(`Eval ${file} failed`);
      failed = true;
    }
  }
  if (failed) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Failed to run evals:', err);
  process.exit(1);
});
